import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity.write-client'
import { theme } from '@/styles/theme'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_REGEX = /(https?:\/\/|www\.)/i

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { product, author, email, rating, quote, locale, website } = body as Record<string, unknown>

  // 1. Honeypot — silently succeed if bot filled the hidden field
  if (website) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // 2. Input validation
  if (!product || typeof product !== 'string' || product.trim() === '') {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  }
  if (!author || typeof author !== 'string' || author.trim() === '' || author.length > 100) {
    return NextResponse.json({ error: 'Invalid author' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
  }
  if (
    !quote ||
    typeof quote !== 'string' ||
    quote.trim().length < 20 ||
    quote.length > 1000 ||
    URL_REGEX.test(quote)
  ) {
    return NextResponse.json({ error: 'Invalid review text' }, { status: 400 })
  }
  if (locale !== 'en' && locale !== 'he') {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const normalizedEmail = (email as string).trim().toLowerCase()
  const productId = (product as string).trim()

  // 3. Rate limit: reject if same email submitted for this product in last 24h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const recentId = await sanityWriteClient.fetch<string | null>(
    `*[_type == "review" && email == $email && product == $product && _createdAt > $since][0]._id`,
    { email: normalizedEmail, product: productId, since },
  )
  if (recentId) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  // 4. Permanent duplicate: one review per email per product ever
  const duplicateId = await sanityWriteClient.fetch<string | null>(
    `*[_type == "review" && email == $email && product == $product][0]._id`,
    { email: normalizedEmail, product: productId },
  )
  if (duplicateId) {
    return NextResponse.json({ error: 'duplicate' }, { status: 409 })
  }

  // 5. Create review document
  const token = crypto.randomUUID()
  const doc = await sanityWriteClient.create({
    _type: 'review',
    product: productId,
    author: (author as string).trim(),
    email: normalizedEmail,
    rating,
    quote: (quote as string).trim(),
    locale,
    date: new Date().toISOString().slice(0, 10),
    approved: false,
    emailVerified: false,
    verificationToken: token,
  })

  // 6. Send verification email via Resend
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin
  const baseUrl = siteUrl
  const verifyUrl = `${baseUrl}/api/reviews/verify?token=${token}&id=${doc._id}`

  try {
    await resend.emails.send({
      from: 'Olivum <onboarding@resend.dev>',
      to: normalizedEmail,
      subject: 'Confirm your Olivum review',
      html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;">
        <h2 style="font-size:18px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:${theme.colors.textDark};margin-bottom:16px;">
          THE VALLEY OLIVE OIL
        </h2>
        <p style="color:${theme.colors.textDark};line-height:1.7;font-size:14px;font-weight:300;">
          Thanks for your review, ${(author as string).trim().replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c] ?? c))}! Click the button below to verify your email and submit your review for approval.
        </p>
        <a href="${verifyUrl}"
           style="display:inline-block;margin-top:20px;padding:14px 28px;background:${theme.colors.btnDark};color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">
          Verify My Review
        </a>
        <p style="margin-top:28px;font-size:12px;color:${theme.colors.muted};line-height:1.6;">
          This link expires in 48 hours. If you did not submit a review, you can safely ignore this email.
        </p>
      </div>
    `,
    })
  } catch {
    // Clean up the orphaned document so the user can retry
    await sanityWriteClient.delete(doc._id)
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
