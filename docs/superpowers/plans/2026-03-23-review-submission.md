# Review Submission Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a customer review submission form to the product page with email verification via Resend and spam protection via honeypot, rate limiting, and admin approval gate in Sanity Studio.

**Architecture:** A POST `/api/reviews` route validates input, applies 7 security layers, writes a review document to Sanity (`approved: false, emailVerified: false`), and sends a verification email via Resend. A GET `/api/reviews/verify` route validates the token, marks `emailVerified: true`, and redirects to the product page. The `ReviewForm` client component sits below `ReviewsSection` inside a `ReviewsSectionWrapper` with `max-height + overflow-y: auto`.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Sanity v5 write API, Resend email SDK, Styled Components v6, next-intl (EN + HE/RTL)

**Critical context for implementers:**
- `ProductDetail.tsx` is already `'use client'` — use `useTranslations('product')` for labels, NOT `getTranslations`
- All styles go in `.styles.ts` files — never inline in `.tsx`
- No raw hex values in styles — always `theme.colors.*`
- Both `lang/en.json` and `lang/he.json` must be updated simultaneously
- `SANITY_API_TOKEN` already in `.env.local`; `RESEND_API_KEY` must be added

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `.env.local` | Modify | Add `RESEND_API_KEY` |
| `studio/schemaTypes/review.ts` | Modify | Add email, emailVerified, verificationToken, locale fields |
| `lib/sanity.write-client.ts` | Create | Server-only Sanity write client |
| `lib/cms/reviews.ts` | Modify | Add `emailVerified == true` to GROQ query |
| `lang/en.json` | Modify | Add `product.review.*` keys |
| `lang/he.json` | Modify | Add `product.review.*` keys (Hebrew) |
| `app/api/reviews/route.ts` | Create | POST handler: validate, rate-limit, write, send email |
| `app/api/reviews/verify/route.ts` | Create | GET handler: verify token, patch doc, redirect |
| `components/product-detail/ReviewForm.styles.ts` | Create | Styled components for review form |
| `components/product-detail/ReviewForm.tsx` | Create | Review form client component |
| `components/product-detail/ProductDetail.styles.ts` | Modify | Add `ReviewsSectionWrapper` |
| `components/product-detail/ProductDetail.tsx` | Modify | Import ReviewForm, wrap in ReviewsSectionWrapper |
| `components/product-detail/index.ts` | Modify | Export ReviewForm |

---

### Task 1: Install packages and add env var

**Files:**
- Modify: `.env.local`

- [x] **Step 1: Install resend and server-only**

```bash
cd /Users/matanshaviro/Documents/nextjs/my-projects/olive
npm install resend server-only
```

Expected: packages installed with no errors.

- [x] **Step 2: Add RESEND_API_KEY to .env.local**

Open `.env.local` and add this line at the end:

```
RESEND_API_KEY=re_HvvgrueT_P6M7MFMSJur6Wks6EPWsET1b
```

- [x] **Step 3: Verify TypeScript still compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (or only pre-existing ones).

- [x] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install resend and server-only packages"
```

Note: do NOT commit `.env.local` — it is gitignored.

---

### Task 2: Update Sanity review schema

**Files:**
- Modify: `studio/schemaTypes/review.ts`

Current file has fields: product, author, rating, quote, date, approved.
Add: email, emailVerified, verificationToken, locale.

- [x] **Step 1: Open and read the current schema**

Read `studio/schemaTypes/review.ts` to understand current field order.

- [x] **Step 2: Add the four new fields**

After the `approved` field, add:

```ts
defineField({
  name: 'email',
  title: 'Email',
  type: 'string',
  description: 'Reviewer email — stored for admin reference only, never shown publicly.',
  validation: (r) => r.required(),
}),
defineField({
  name: 'emailVerified',
  title: 'Email Verified',
  type: 'boolean',
  initialValue: false,
}),
defineField({
  name: 'verificationToken',
  title: 'Verification Token',
  type: 'string',
  description: 'Random UUID — cleared after use. Do not edit manually.',
  readOnly: true,
}),
defineField({
  name: 'locale',
  title: 'Locale',
  type: 'string',
  options: { list: ['en', 'he'] },
  description: 'Locale at time of submission — used for redirect after verification.',
}),
```

- [x] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

- [x] **Step 4: Commit**

```bash
git add studio/schemaTypes/review.ts
git commit -m "feat(schema): add email, emailVerified, verificationToken, locale to review"
```

---

### Task 3: Create server-only Sanity write client

**Files:**
- Create: `lib/sanity.write-client.ts`

This client uses `SANITY_API_TOKEN` for write access. The `import 'server-only'` guard prevents accidental use in client components (Next.js will throw a build error if this file is ever imported from a client boundary).

- [x] **Step 1: Create the file**

```ts
import 'server-only'
import { createClient } from '@sanity/client'

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})
```

- [x] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [x] **Step 3: Commit**

```bash
git add lib/sanity.write-client.ts
git commit -m "feat(cms): add server-only Sanity write client"
```

---

### Task 4: Update GROQ query to require emailVerified

**Files:**
- Modify: `lib/cms/reviews.ts`

The public reviews query must only return reviews where the user has clicked the verification link AND the admin has approved.

- [x] **Step 1: Open and read lib/cms/reviews.ts**

Locate `REVIEWS_BY_PRODUCT_QUERY`.

- [x] **Step 2: Add emailVerified condition**

Change:
```groq
*[_type == "review" && product == $productId && approved == true]
```

To:
```groq
*[_type == "review" && product == $productId && approved == true && emailVerified == true]
```

- [x] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [x] **Step 4: Commit**

```bash
git add lib/cms/reviews.ts
git commit -m "feat(cms): require emailVerified == true in public reviews query"
```

---

### Task 5: Add i18n keys for review form

**Files:**
- Modify: `lang/en.json`
- Modify: `lang/he.json`

Both files must be updated in the same step. The new keys live under `product.review` (singular) — distinct from the existing `product.reviews` (plural) display keys.

- [x] **Step 1: Add keys to lang/en.json**

Inside the `"product"` object, after the `"shipping"` block, add:

```json
"review": {
  "formHeading": "Write a Review",
  "namePlaceholder": "Your name",
  "emailPlaceholder": "Your email",
  "textPlaceholder": "Share your experience (20–1000 characters)",
  "starLabel": "Rate {n} out of 5",
  "submit": "Submit Review",
  "submitting": "Submitting...",
  "success": "Thanks! Check your inbox to verify your review.",
  "errorGeneric": "Something went wrong. Please try again.",
  "errorDuplicate": "You've already submitted a review for this product.",
  "errorRateLimit": "Please wait before submitting another review."
}
```

- [x] **Step 2: Add keys to lang/he.json**

Inside the `"product"` object, after the `"shipping"` block, add:

```json
"review": {
  "formHeading": "כתוב ביקורת",
  "namePlaceholder": "השם שלך",
  "emailPlaceholder": "האימייל שלך",
  "textPlaceholder": "שתף את החוויה שלך (20–1000 תווים)",
  "starLabel": "דרג {n} מתוך 5",
  "submit": "שלח ביקורת",
  "submitting": "שולח...",
  "success": "תודה! בדוק את תיבת הדואר שלך לאישור הביקורת.",
  "errorGeneric": "משהו השתבש. נסה שוב.",
  "errorDuplicate": "כבר שלחת ביקורת על מוצר זה.",
  "errorRateLimit": "המתן לפני שליחת ביקורת נוספת."
}
```

- [x] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [x] **Step 4: Commit**

```bash
git add lang/en.json lang/he.json
git commit -m "feat(i18n): add product.review.* keys for review form (EN + HE)"
```

---

### Task 6: Create POST /api/reviews route

**Files:**
- Create: `app/api/reviews/route.ts`

This is the core submission handler. It runs all 7 security checks in order before writing to Sanity and sending the verification email.

- [x] **Step 1: Create the directory and file**

Create `app/api/reviews/route.ts` with the following content:

```ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sanityWriteClient } from '@/lib/sanity.write-client'

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
  const baseUrl = new URL(request.url).origin
  const verifyUrl = `${baseUrl}/api/reviews/verify?token=${token}&id=${doc._id}`

  await resend.emails.send({
    from: 'Olivum <onboarding@resend.dev>',
    to: normalizedEmail,
    subject: 'Confirm your Olivum review',
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;">
        <h2 style="font-size:18px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:#11260c;margin-bottom:16px;">
          THE VALLEY OLIVE OIL
        </h2>
        <p style="color:#11260c;line-height:1.7;font-size:14px;font-weight:300;">
          Thanks for your review, ${(author as string).trim()}! Click the button below to verify your email and submit your review for approval.
        </p>
        <a href="${verifyUrl}"
           style="display:inline-block;margin-top:20px;padding:14px 28px;background:#1f231a;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;">
          Verify My Review
        </a>
        <p style="margin-top:28px;font-size:12px;color:#6b7280;line-height:1.6;">
          This link expires in 48 hours. If you did not submit a review, you can safely ignore this email.
        </p>
      </div>
    `,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
```

**Note on Resend sender:** `onboarding@resend.dev` works for testing on the free tier. For production, verify your domain at resend.com and update the `from` field to `noreply@yourdomain.com`.

- [x] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [x] **Step 3: Commit**

```bash
git add app/api/reviews/route.ts
git commit -m "feat(api): add POST /api/reviews with validation, rate limiting, and Resend"
```

---

### Task 7: Create GET /api/reviews/verify route

**Files:**
- Create: `app/api/reviews/verify/route.ts`

This handler is triggered when the user clicks the link in the verification email. It validates the token, marks `emailVerified: true`, clears the token, and redirects to the product page in the reviewer's locale.

- [x] **Step 1: Create the directory and file**

Create `app/api/reviews/verify/route.ts` with the following content:

```ts
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

  const locale = review.locale ?? 'en'
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
```

- [x] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [x] **Step 3: Commit**

```bash
git add app/api/reviews/verify/route.ts
git commit -m "feat(api): add GET /api/reviews/verify for email token verification"
```

---

### Task 8: Create ReviewForm styles

**Files:**
- Create: `components/product-detail/ReviewForm.styles.ts`

All styled components for the form live here. `ReviewForm.tsx` only imports from this file — no inline styles.

- [x] **Step 1: Create the file**

```ts
import styled from 'styled-components'

export const FormWrapper = styled.div`
  padding-top: 32px;
`

export const FormHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 20px;
`

export const StarRow = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`

export const StarButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  color: ${({ $active, theme }) => ($active ? theme.colors.textDark : theme.colors.borderMuted)};
  transition: color 0.1s ease;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`

export const FormInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMuted};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  background: transparent;
  padding: 8px 0;
  width: 100%;
  letter-spacing: 0.3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.4;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const FormTextarea = styled.textarea`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderMuted};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  background: transparent;
  padding: 8px 0;
  width: 100%;
  resize: vertical;
  min-height: 80px;
  letter-spacing: 0.3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDark};
    opacity: 0.4;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const SubmitBtn = styled.button<{ $loading: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
  opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};
  transition: opacity 0.2s ease;
  margin-top: 8px;
`

export const SuccessMessage = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.7;
  padding: 24px 0;
`

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.warningAmber};
  margin-top: 8px;
`

export const HoneypotField = styled.div`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  height: 0;
  overflow: hidden;
`
```

- [x] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [x] **Step 3: Commit**

```bash
git add components/product-detail/ReviewForm.styles.ts
git commit -m "feat(ui): add ReviewForm styled components"
```

---

### Task 9: Create ReviewForm component

**Files:**
- Create: `components/product-detail/ReviewForm.tsx`

- [x] **Step 1: Create the file**

```tsx
'use client'

import { useState } from 'react'
import {
  FormWrapper,
  FormHeading,
  StarRow,
  StarButton,
  FieldGroup,
  FormInput,
  FormTextarea,
  SubmitBtn,
  SuccessMessage,
  ErrorMessage,
  HoneypotField,
} from './ReviewForm.styles'

interface Labels {
  heading: string
  namePlaceholder: string
  emailPlaceholder: string
  textPlaceholder: string
  starLabel: string
  submit: string
  submitting: string
  success: string
  errorGeneric: string
  errorDuplicate: string
  errorRateLimit: string
}

interface Props {
  productId: string
  locale: string
  labels: Labels
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ReviewForm({ productId, locale, labels }: Props) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [quote, setQuote] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (rating < 1 || !name.trim() || !EMAIL_REGEX.test(email) || quote.trim().length < 20) {
      setErrorMsg(labels.errorGeneric)
      return
    }

    setFormState('submitting')

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productId,
          author: name.trim(),
          email: email.trim().toLowerCase(),
          rating,
          quote: quote.trim(),
          locale,
          website: honeypot,
        }),
      })

      if (res.status === 201) {
        setFormState('success')
        return
      }
      if (res.status === 409) {
        setErrorMsg(labels.errorDuplicate)
      } else if (res.status === 429) {
        setErrorMsg(labels.errorRateLimit)
      } else {
        setErrorMsg(labels.errorGeneric)
      }
      setFormState('error')
    } catch {
      setErrorMsg(labels.errorGeneric)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <FormWrapper>
        <SuccessMessage>{labels.success}</SuccessMessage>
      </FormWrapper>
    )
  }

  const displayRating = hoveredRating || rating

  return (
    <FormWrapper>
      <FormHeading>{labels.heading}</FormHeading>
      <form onSubmit={handleSubmit}>
        <StarRow>
          {[1, 2, 3, 4, 5].map((n) => (
            <StarButton
              key={n}
              type="button"
              $active={n <= displayRating}
              aria-label={labels.starLabel.replace('{n}', String(n))}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoveredRating(n)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              ★
            </StarButton>
          ))}
        </StarRow>

        <HoneypotField aria-hidden="true">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </HoneypotField>

        <FieldGroup>
          <FormInput
            type="text"
            placeholder={labels.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
          />
          <FormInput
            type="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormTextarea
            placeholder={labels.textPlaceholder}
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            minLength={20}
            maxLength={1000}
            required
          />
        </FieldGroup>

        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

        <SubmitBtn
          type="submit"
          $loading={formState === 'submitting'}
          disabled={formState === 'submitting'}
        >
          {formState === 'submitting' ? labels.submitting : labels.submit}
        </SubmitBtn>
      </form>
    </FormWrapper>
  )
}
```

- [x] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [x] **Step 3: Commit**

```bash
git add components/product-detail/ReviewForm.tsx
git commit -m "feat(ui): add ReviewForm client component with star selector and honeypot"
```

---

### Task 10: Integrate ReviewForm into ProductDetail

**Files:**
- Modify: `components/product-detail/ProductDetail.styles.ts` (add `ReviewsSectionWrapper`)
- Modify: `components/product-detail/ProductDetail.tsx` (import, wrap, add ReviewForm)
- Modify: `components/product-detail/index.ts` (export ReviewForm)

- [x] **Step 1: Add ReviewsSectionWrapper to ProductDetail.styles.ts**

At the bottom of `components/product-detail/ProductDetail.styles.ts`, add:

```ts
export const ReviewsSectionWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
`
```

- [x] **Step 2: Update ProductDetail.tsx imports**

In `components/product-detail/ProductDetail.tsx`, add these imports:

```ts
import { useParams } from 'next/navigation'
import ReviewForm from './ReviewForm'
import { ReviewsSectionWrapper } from './ProductDetail.styles'
```

Also add `ReviewsSectionWrapper` to the existing destructured import from `'./ProductDetail.styles'`.

- [x] **Step 3: Read locale from URL params in ProductDetail**

Inside the `ProductDetail` function body, add after the existing hooks:

```ts
const params = useParams()
const locale = (params?.locale as string) ?? 'en'
```

- [x] **Step 4: Wrap ReviewsSection + ReviewForm in ProductDetail.tsx**

Replace:
```tsx
<ReviewsSection
  reviews={reviews}
  heading={t('reviews.heading')}
  noReviewsLabel={t('reviews.noReviews')}
/>
```

With:
```tsx
<ReviewsSectionWrapper>
  <ReviewsSection
    reviews={reviews}
    heading={t('reviews.heading')}
    noReviewsLabel={t('reviews.noReviews')}
  />
  <ReviewForm
    productId={product.id}
    locale={locale}
    labels={{
      heading: t('review.formHeading'),
      namePlaceholder: t('review.namePlaceholder'),
      emailPlaceholder: t('review.emailPlaceholder'),
      textPlaceholder: t('review.textPlaceholder'),
      starLabel: t('review.starLabel'),
      submit: t('review.submit'),
      submitting: t('review.submitting'),
      success: t('review.success'),
      errorGeneric: t('review.errorGeneric'),
      errorDuplicate: t('review.errorDuplicate'),
      errorRateLimit: t('review.errorRateLimit'),
    }}
  />
</ReviewsSectionWrapper>
```

- [x] **Step 5: Export ReviewForm from barrel**

In `components/product-detail/index.ts`, add:

```ts
export { default as ReviewForm } from './ReviewForm'
```

- [x] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [x] **Step 7: Commit**

```bash
git add components/product-detail/ProductDetail.styles.ts \
        components/product-detail/ProductDetail.tsx \
        components/product-detail/index.ts
git commit -m "feat(ui): integrate ReviewForm into ProductDetail with ReviewsSectionWrapper"
```

---

### Task 11: Manual smoke test

- [x] **Step 1: Start dev server (clearing cache first)**

```bash
rm -rf .next && npm run dev
```

- [x] **Step 2: Test the review form UI**

1. Navigate to `http://localhost:3000/en/product`
2. Scroll down to the reviews section — the "Write a Review" form should appear below the reviews list
3. Check that the entire reviews area has `max-height: 600px` and scrolls when content overflows
4. Hover over stars — they should highlight progressively
5. Click a star — it should lock
6. Fill in name, email, review text (min 20 chars)
7. Submit — button should show "Submitting..." then either success or error

- [x] **Step 3: Test honeypot (manual)**

Open browser DevTools, find the hidden `website` input, set its value to anything, and submit the form. The API should silently return 200 without creating a Sanity document. Verify in Sanity Studio that no document was created.

- [x] **Step 4: Test email verification flow**

1. Submit a valid review
2. Check the email inbox (Resend sandbox — first test will go to your Resend account email)
3. Click the verification link
4. Should redirect to `/en/product?id=...`
5. Check Sanity Studio → the review should have `emailVerified: true`, `approved: false`
6. Approve the review in Studio → it should appear in the reviews list on the product page

- [x] **Step 5: Test Hebrew locale**

1. Navigate to `http://localhost:3000/he/product`
2. Form labels should be in Hebrew
3. Submit a review → verification email sent → click link → redirect to `/he/product`

- [x] **Step 6: Test duplicate protection**

Submit the same email + product twice. Second attempt should show the "already submitted" error.

- [x] **Step 7: Final commit**

```bash
git add .
git commit -m "chore: review submission feature complete — ready for manual testing"
```

---

## Post-Plan Additions

The following improvements were made after the original plan was executed:

### Accordion UI (replaces scrollable wrapper)
`ReviewsSectionWrapper` was changed from `max-height: 600px; overflow-y: auto` to `display: flex; flex-direction: column`. The reviews list and form are now each wrapped in a collapsible `AccordionSection` (CSS `max-height` transition). New styled components added to `ProductDetail.styles.ts`: `AccordionSection`, `AccordionHeader`, `AccordionTitleGroup`, `AccordionTitle`, `AccordionMeta`, `AccordionChevron<{$open}>`, `AccordionBody<{$open}>`. State: `isReviewsOpen`, `isFormOpen` in `ProductDetail.tsx`.

### Verification success toast
`VerificationToast` styled component added to `ProductDetail.styles.ts` (fixed position, dark background, slide-in via `translateY`). Controlled by `toastVisible` state. Auto-dismisses after 4s via `useEffect`. URL cleaned with `router.replace` to remove `?verified=1`. New i18n key: `product.review.verifiedSuccess`.

### Review section visual redesign
- `ReviewStars` → amber (`warningAmber`) with `letter-spacing: 3px`
- `ReviewCard` → padding-based spacing, border-top separator, first card has no border
- `AccordionMeta` (rating display) → uses `warningAmber`
- `AccordionHeader` → hover opacity transition

### Per-field inline validation (replaces browser native bubbles)
`<form noValidate>` disables browser validation tooltips. `fieldErrors` state object tracks per-field error messages, cleared on each field change. New styled components: `FieldItem` (flex column wrapper), `FieldError` (amber inline error). `SuccessMessage` restructured into `SuccessMessage` + `SuccessIcon` + `SuccessText`. Four new i18n keys added to both lang files: `starRequired`, `nameRequired`, `emailRequired`, `quoteRequired`. `starLabel` type changed from `string` to `(n: number) => string` to fix next-intl ICU interpolation error.
