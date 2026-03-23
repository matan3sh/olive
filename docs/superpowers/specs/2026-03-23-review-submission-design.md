# Review Submission Feature Design

**Date:** 2026-03-23
**Branch:** `feat/ecommerce-schema`
**Status:** Approved for implementation
**Extends:** `2026-03-23-ecommerce-schema-design.md` (moves "Customer-facing review submission form" from Out of Scope into scope)

---

## Overview

Allow customers to submit reviews directly on the product page. Reviews are gated behind two approval steps: email verification (automated) and admin approval (manual in Sanity Studio). This prevents spam while keeping the implementation serverless-friendly with no additional infrastructure.

---

## 1. Sanity Schema Changes

### `studio/schemaTypes/review.ts`

Add four fields to the existing `review` document type:

| Field | Type | Default | Notes |
|-------|------|---------|-------|
| `email` | `string` | — | Required. Stored for admin reference. Never returned by public GROQ queries. |
| `emailVerified` | `boolean` | `false` | Set to `true` when user clicks the verification link. |
| `verificationToken` | `string` | — | Random UUID generated at submission. Cleared after use. |
| `locale` | `string` | — | Locale at submission time (`'en'` or `'he'`). Used for redirect after verification. |

Rating validation stays `min(1).max(5)` — 1 to 5 stars (0 is not a valid rating).

---

## 2. CMS Data Layer Changes

### `lib/cms/types.ts`

Update `Review` and `RawReview` interfaces — `email`, `emailVerified`, `verificationToken`, `locale` are NOT included (never fetched publicly). No change to the public interface.

### `lib/cms/reviews.ts`

Update `REVIEWS_BY_PRODUCT_QUERY` to add `emailVerified == true`:

```groq
*[_type == "review" && product == $productId && approved == true && emailVerified == true]
| order(date desc) {
  "_id": _id, product, author, rating, quote, "date": date
}
```

### `lib/sanity.write-client.ts` (new)

Server-only Sanity client with write permissions. Must begin with `import 'server-only'` to prevent accidental use in client components and exposure of `SANITY_API_TOKEN` in the browser bundle.

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

---

## 3. API Routes

All route handlers use Next.js 16 App Router named export convention:
- `export async function POST(request: Request)` for POST routes
- `export async function GET(request: Request)` for GET routes

Return values use `NextResponse.json(...)` and `NextResponse.redirect(...)`.

---

### `app/api/reviews/route.ts`

**Export:** `export async function POST(request: Request)`

**Request body:**
```ts
{
  product: string      // product ID (e.g. "robust")
  author: string       // display name
  email: string        // reviewer's email
  rating: number       // 1–5
  quote: string        // review text
  locale: string       // 'en' | 'he' — passed from the form
  website: string      // honeypot — must be empty string
}
```

**Server logic (in order):**

1. **Honeypot check** — if `website` is non-empty, return `200 OK` silently (do not save)
2. **Input validation** (return `400` on failure):
   - `product`: required, non-empty string
   - `author`: required, 1–100 chars
   - `email`: required, valid email format, max 254 chars
   - `rating`: required, integer, 1–5
   - `quote`: required, 20–1000 chars, no URLs (regex: `/(https?:\/\/|www\.)/i`)
   - `locale`: must be `'en'` or `'he'`
3. **Rate limiting** — query Sanity for any review with `email == $email && product == $productId` created in the last 24 hours. If found, return `429 Too Many Requests` — the client treats this as `errorRateLimit`.
4. **Duplicate check** — query Sanity for any review with `email == $email && product == $productId` (regardless of age). If found, return `409 Conflict` — the client shows `errorDuplicate`.
5. **Create review** — use `sanityWriteClient` to create document:
   ```ts
   {
     _type: 'review',
     product,
     author,
     email,
     rating,
     quote,
     locale,
     date: new Date().toISOString().slice(0, 10),
     approved: false,
     emailVerified: false,
     verificationToken: crypto.randomUUID(),
   }
   ```
6. **Send verification email** via Resend SDK:
   - To: reviewer's email
   - Subject: `Confirm your Olivum review`
   - Body: minimal branded HTML with a CTA button linking to:
     `GET /api/reviews/verify?token=[token]&id=[_id]`
7. Return `201 Created` with `{ success: true }`

**Error responses:**
- `400` — validation failure
- `409` — duplicate review (client shows `errorDuplicate`)
- `429` — rate limited (client shows `errorRateLimit`)
- `500` — server/Sanity/Resend error (client shows `errorGeneric`)

---

### `app/api/reviews/verify/route.ts`

**Export:** `export async function GET(request: Request)`

**Query params:** `token`, `id`

**Server logic:**
1. Fetch review from Sanity by `_id` = `id`
2. If not found → redirect to `/en` (homepage)
3. If `emailVerified == true` → already verified, redirect to product page (idempotent)
4. If token doesn't match `verificationToken` → redirect to `/en` with error
5. Check expiry: `_createdAt` must be within 48 hours of now. If expired → redirect to `/en` with error
6. Patch the review: `{ emailVerified: true, verificationToken: null }`
7. Read `locale` from the fetched review document; redirect to `/${locale}/product?id=[product]`

This preserves the reviewer's language — a Hebrew user clicking the verification link lands on the Hebrew product page.

---

## 4. Environment Variables

Add to `.env.local`:
```
RESEND_API_KEY=re_...
```

---

## 5. ReviewForm Component

### `components/product-detail/ReviewForm.tsx`

`'use client'` component. Receives `productId`, `locale`, and pre-resolved `labels` as props (labels are resolved in the server component `ProductDetail` using `useTranslations('product')`).

Props:
```ts
interface Props {
  productId: string
  locale: string        // 'en' | 'he' — passed through to the API
  labels: {
    heading: string
    namePlaceholder: string
    emailPlaceholder: string
    textPlaceholder: string
    starLabel: string      // e.g. "Rate {n} out of 5" — used as aria-label template
    submit: string
    submitting: string
    success: string
    errorGeneric: string
    errorDuplicate: string
    errorRateLimit: string
  }
}
```

**i18n namespace note:** `ProductDetail` already uses `useTranslations('product')`. The new form labels live under `product.review` (singular), keeping them distinct from the existing display keys under `product.reviews` (plural).

**State machine:** `'idle' | 'submitting' | 'success' | 'error'`

**Star selector:** 5 stars rendered as `<button>` elements. Hover highlights stars up to hovered index. Click locks the selection. Each button has `aria-label={labels.starLabel.replace('{n}', String(i + 1))}` for screen reader accessibility. Keyboard accessible (arrow keys, Enter).

**Honeypot:** Hidden `<input name="website">` styled via `HoneypotField` in `ReviewForm.styles.ts` (`position: absolute; opacity: 0; pointer-events: none; height: 0`). NOT `display: none` — some bots skip visually hidden fields but fill CSS-hidden ones.

**On submit:**
1. Client-side pre-validation (name, email format, rating selected, quote length)
2. POST to `/api/reviews` with all fields including `locale` and `website` (honeypot, always `""` for real users)
3. On `201`: set state to `success`, show confirmation message
4. On `409`: show `errorDuplicate`
5. On `429`: show `errorRateLimit`
6. On any other error: show `errorGeneric`, keep form

**Success state:** Form is replaced by the `success` label string.

---

## 6. Styles

### `components/product-detail/ReviewForm.styles.ts`

All styled components live here. `ProductDetail.tsx` only imports them — no inline styles.

Key components:
- `FormWrapper` — column flex, `gap: 16px`, `padding-top: 32px`
- `FormHeading` — matches `ReviewsHeading` style (uppercase, 13px, `theme.colors.textDark`, 0.5 opacity)
- `StarRow` — `display: flex; gap: 4px;`
- `StarButton` — styled `button`, 28px star, color switches between `theme.colors.textDark` (selected/hover) and `theme.colors.borderMuted` (empty)
- `FormInput` / `FormTextarea` — border-bottom only, `theme.colors.textDark` border, matching existing input aesthetic
- `SubmitBtn` — matches existing button style in product detail
- `SuccessMessage` — confirmation text style
- `ErrorMessage` — error text in `theme.colors.warningAmber`
- `HoneypotField` — `position: absolute; opacity: 0; pointer-events: none; height: 0; overflow: hidden`

All colors reference `theme.colors.*`. No raw hex values.

---

## 7. ProductDetail Integration

### `components/product-detail/ProductDetail.styles.ts`

Add `ReviewsSectionWrapper` here (not in the `.tsx` file):

```ts
export const ReviewsSectionWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
`
```

### `components/product-detail/ProductDetail.tsx`

- Import `ReviewsSectionWrapper` from `./ProductDetail.styles`
- Wrap both `ReviewsSection` and `ReviewForm` in `ReviewsSectionWrapper`
- Pass `product.id` as `productId`, current `locale` as `locale`
- Resolve labels via `const t = await getTranslations('product')` (server component — async, from `next-intl/server`) and pass as the `labels` prop:
  ```ts
  labels={{
    heading: t('review.formHeading'),
    namePlaceholder: t('review.namePlaceholder'),
    // ...etc
  }}
  ```

---

## 8. i18n Keys

**Namespace note:** Keys live under `product.review` (singular) — distinct from the existing `product.reviews` (plural) display keys.

Add to both `lang/en.json` and `lang/he.json` simultaneously:

**`lang/en.json`** — under `"product"`:
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

**`lang/he.json`** — under `"product"`:
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

---

## 9. Barrel Export

### `components/product-detail/index.ts`

Add named re-export (matching the existing pattern for `ReviewsSection` and `ShippingSection`):

```ts
export { default as ReviewForm } from './ReviewForm'
```

---

## 10. Security Summary

| Layer | Mechanism |
|-------|-----------|
| Bot spam | Honeypot field (`HoneypotField` styled component, not `display:none`) |
| Input abuse | Server-side validation: lengths, email format, no URLs in review text |
| Rate limiting | Sanity query: block if same email submitted for same product in last 24h → `429` |
| Duplicate reviews | Block permanently: 1 review per email per product → `409` |
| Fake reviews | Email verification required before review enters approval queue |
| Admin gate | `approved: false` by default — you approve in Sanity Studio |
| Token security | UUID token cleared after use; expires 48h after `_createdAt` |
| Write token | `SANITY_API_TOKEN` server-only, guarded by `import 'server-only'` in write client |

---

## 11. Files Changed

| File | Change |
|------|--------|
| `studio/schemaTypes/review.ts` | Add `email`, `emailVerified`, `verificationToken`, `locale` fields |
| `lib/sanity.write-client.ts` | New — server-only write client (starts with `import 'server-only'`) |
| `lib/cms/reviews.ts` | Add `emailVerified == true` to GROQ query |
| `app/api/reviews/route.ts` | New — `export async function POST(request: Request)` |
| `app/api/reviews/verify/route.ts` | New — `export async function GET(request: Request)` |
| `components/product-detail/ReviewForm.tsx` | New |
| `components/product-detail/ReviewForm.styles.ts` | New |
| `components/product-detail/ProductDetail.tsx` | Wrap ReviewsSection + ReviewForm in ReviewsSectionWrapper; add ReviewForm |
| `components/product-detail/ProductDetail.styles.ts` | Add `ReviewsSectionWrapper` |
| `components/product-detail/index.ts` | Add `export { default as ReviewForm } from './ReviewForm'` |
| `lang/en.json` | Add `product.review.*` keys |
| `lang/he.json` | Add `product.review.*` keys (Hebrew) |
| `.env.local` | Add `RESEND_API_KEY` |

---

## 12. Out of Scope

- Admin notification emails when a new verified review awaits approval
- Review editing or deletion by the reviewer
- Pagination of the reviews list
- Star rating analytics / aggregate rating display
- OAuth / account-based authentication
