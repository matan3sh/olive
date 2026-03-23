import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity.write-client'

interface ReviewDoc {
  _id: string
  _createdAt: string
  product: string
  locale: string
  emailVerified: boolean
  verificationToken: string
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token = searchParams.get('token')
  const id = searchParams.get('id')

  if (!token || !id) {
    return NextResponse.redirect(`${origin}/en`)
  }

  let review: ReviewDoc | null = null
  try {
    review = await sanityWriteClient.fetch<ReviewDoc | null>(
      `*[_type == "review" && _id == $id][0] {
        _id, _createdAt, product, locale, emailVerified, verificationToken
      }`,
      { id },
    )
  } catch {
    return NextResponse.redirect(`${origin}/en`)
  }

  if (!review) {
    return NextResponse.redirect(`${origin}/en`)
  }

  const locale = ['en', 'he'].includes(review.locale) ? review.locale : 'en'
  const productUrl = `${origin}/${locale}/product?id=${review.product}`

  // Already verified — idempotent redirect
  if (review.emailVerified) {
    return NextResponse.redirect(productUrl)
  }

  // Token mismatch
  if (review.verificationToken !== token) {
    return NextResponse.redirect(`${origin}/en`)
  }

  // Expiry check: 48 hours from creation
  const createdAt = new Date(review._createdAt).getTime()
  if (Date.now() - createdAt > 48 * 60 * 60 * 1000) {
    return NextResponse.redirect(`${origin}/en`)
  }

  // Verify and clear token
  await sanityWriteClient
    .patch(review._id)
    .set({ emailVerified: true, verificationToken: null })
    .commit()

  return NextResponse.redirect(productUrl)
}
