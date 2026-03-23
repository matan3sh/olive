# E-Commerce Schema Migration Design

**Date:** 2026-03-23
**Branch:** `feat/ecommerce-schema`
**Status:** Approved for implementation

## Overview

Migrate the Olivum Sanity schema from a simple product schema to a proper e-commerce architecture. The changes are isolated to Sanity schema, CMS data layer (types + GROQ queries + resolvers), and the affected UI components. The migration runs on a separate branch; manual testing precedes any merge to `main`.

---

## 1. Product Schema — Variants

### Current

```ts
sizes: string[]   // e.g. ["250ml", "500ml", "750ml"]
price: string     // e.g. "₪60" — one price for the whole product
```

### After

Replace both fields with a `variants` array of inline objects:

```ts
variants: [
  {
    label: string        // "250ml"
    price: string        // "₪35"
    stock: string        // "in_stock" | "few_left" | "out_of_stock"
  }
]
```

- `price` is removed from the top-level product document.
- The "FROM ₪X" UI label derives its value from the lowest-priced variant (parse numeric, pick min).
- Studio gains a `preview` config on the product document:
  `{ select: { title: 'title.en', media: 'image' } }`
- A `category` field is added as an **optional** single `string` with a validated list:
  `{ list: ['Extra Virgin', 'Infused', 'Gift Sets'] }` — editors pick from a dropdown, no free text.
- The `stock` field inside each variant uses a validated list in Sanity Studio:
  ```
  { title: 'In Stock', value: 'in_stock' }
  { title: 'Few Left', value: 'few_left' }
  { title: 'Out of Stock', value: 'out_of_stock' }
  ```
  Required field with no free text.

### TypeScript impact

```ts
// Remove from Product / RawProduct:
price: string
sizes: string[]

// Add to Product / RawProduct:
variants: ProductVariant[]
category?: string

// New shared type:
interface ProductVariant {
  label: string
  price: string
  stock: 'in_stock' | 'few_left' | 'out_of_stock'
}
```

`resolve()` in `lib/cms/products.ts` passes `variants` and `category` through unchanged (no localization).

### GROQ impact

All three product queries (`RAW_PRODUCTS_QUERY`, `ALL_PRODUCTS_QUERY`, `PRODUCT_BY_ID_QUERY`) replace `price, sizes` with `variants` and add `category`.

### Theme impact

Add one new color token to `styles/theme.ts`:

```ts
warningAmber: '#d97706'  // used for "few left" dashed border
```

All stock-status styles in `SizeSelector.styles.ts` reference `theme.colors.warningAmber` — no raw hex values.

---

## 2. Reviews

### Schema

New top-level document type `review`:

| Field      | Type      | Notes |
|------------|-----------|-------|
| `product`  | `string`  | Matches `product.id` — links review to product |
| `author`   | `string`  | Reviewer name, required |
| `rating`   | `number`  | 1–5, required, validated min/max |
| `quote`    | `string`  | Plain string — author writes in any language |
| `approved` | `boolean` | Editor-controlled; only `approved == true` shows on site |
| `date`     | `date`    | Review date, required |

Studio preview: `{ select: { title: 'author', subtitle: 'product' } }`

### CMS data layer

New file `lib/cms/reviews.ts`:
- `Review` interface (fields: `product`, `author`, `rating`, `quote`, `date`)
- `RawReview` = same as `Review` (no localization — `resolve()` is a passthrough returning the raw doc as-is)
- `REVIEWS_BY_PRODUCT_QUERY` — fetches reviews where `_type == "review" && product == $productId && approved == true`, ordered by `date desc`
- `getReviewsByProduct(productId: string): Promise<Review[]>`

Barrel export: add `export * from './reviews'` to `lib/cms/index.ts`.

### Data fetching

Fetched in `app/[locale]/product/page.tsx` (server component), alongside existing queries:

```ts
const [product, allProducts, navigation, reviews, shippingSettings] = await Promise.all([
  getProductById(id, loc),
  getProducts(loc),
  getNavigation(loc),
  getReviewsByProduct(id),
  getShippingSettings(loc),
])
```

Passed as props to `ProductDetail`:

```ts
<ProductDetail product={product} allProducts={allProducts} reviews={reviews} shippingSettings={shippingSettings} />
```

### UI layout

Placed in `ProductDetail.tsx` after `ProductDetailsRow` and before `RelatedProducts`:

```
1. SizeSelector
2. ProductDescription
3. AddToCartButton
4. ProductDivider
5. ProductDetailsRow
6. [NEW] ShippingSection
7. [NEW] ReviewsSection
8. RelatedProducts
```

`ReviewsSection` renders a heading (i18n key: `product.reviews.heading`) followed by a flat list of review cards. Each card shows: star rating (filled/empty Unicode stars), author name, date (formatted), and quote text.

i18n keys:
```json
"product": {
  "reviews": {
    "heading": "Customer Reviews",
    "noReviews": "No reviews yet."
  }
}
```

Hebrew:
```json
"product": {
  "reviews": {
    "heading": "ביקורות לקוחות",
    "noReviews": "אין ביקורות עדיין."
  }
}
```

---

## 3. Shipping Settings

### Schema

New singleton document type `shippingSettings` (one global document, not a list):

```ts
zones: [
  {
    label: string          // "Israel Standard"
    price: string          // "₪25"
    estimatedDays: string  // "3–5 business days"
    freeThreshold: string  // "Free above ₪200"
  }
]
notes: localizedString     // EN + HE — e.g. "We ship Sunday–Thursday"
```

Registered as a singleton in Studio desk structure.

### CMS data layer

New file `lib/cms/shipping.ts`:
- `ShippingZone` interface: `{ label, price, estimatedDays, freeThreshold }`
- `RawShippingSettings` interface: `{ zones: ShippingZone[], notes: LocalizedString }`
- `ShippingSettings` interface: `{ zones: ShippingZone[], notes: string }` (notes localized at resolve time)
- `SHIPPING_SETTINGS_QUERY`
- `resolve(raw, locale)` — resolves `notes` from `LocalizedString` to `string`
- `getShippingSettings(locale: Locale): Promise<ShippingSettings | null>`

Barrel export: add `export * from './shipping'` to `lib/cms/index.ts`.

### UI layout

`ShippingSection` is a non-collapsible section (simple expand would require a client component; keep server-renderable). Shows heading + a table of zones + the localized notes.

i18n keys:
```json
"product": {
  "shipping": {
    "heading": "Shipping",
    "zone": "Zone",
    "price": "Price",
    "delivery": "Delivery",
    "freeAbove": "Free above"
  }
}
```

Hebrew:
```json
"product": {
  "shipping": {
    "heading": "משלוח",
    "zone": "אזור",
    "price": "מחיר",
    "delivery": "זמן אספקה",
    "freeAbove": "חינם מעל"
  }
}
```

---

## 4. SizeSelector / Stock Status UI

### Behaviour (Option C — Tooltip on hover)

- **In stock**: normal button, no indicator
- **Few left**: dashed `theme.colors.warningAmber` border; on hover shows tooltip: i18n key `product.fewLeft`
- **Out of stock**: greyed-out, `theme.colors.muted` border, cursor `not-allowed`, cannot be selected; on hover shows tooltip: i18n key `product.outOfStock`

i18n keys:
```json
"product": {
  "outOfStock": "Out of stock",
  "fewLeft": "Only a few left"
}
```

Hebrew:
```json
"product": {
  "outOfStock": "אזל מהמלאי",
  "fewLeft": "נשארו רק כמה"
}
```

### SizeSelector props

```ts
// Before:
{ sizes: string[], selectedSize: number, onSelect: (i) => void, label: string }

// After:
{ variants: ProductVariant[], selectedSize: number, onSelect: (i) => void, label: string }
```

`handleAddToCart` in `ProductDetail` uses `product.variants[selectedSize].price`.

The "FROM ₪X" displayed price is computed by parsing numeric values from all variant prices and displaying the minimum.

---

## 5. Files Changed

| File | Change |
|------|--------|
| `styles/theme.ts` | Add `warningAmber` color token |
| `studio/schemaTypes/product.ts` | Replace `sizes`+`price` with `variants` (with stock list); add `category` (with list); add `preview` |
| `studio/schemaTypes/review.ts` | New file |
| `studio/schemaTypes/shipping.ts` | New file |
| `studio/schemaTypes/index.ts` | Add `export * from './review'` and `export * from './shipping'` |
| `lib/cms/types.ts` | Add `ProductVariant`; update `Product`/`RawProduct` (remove `price`, `sizes`; add `variants`, `category`); add `Review`, `RawReview`, `ShippingZone`, `RawShippingSettings`, `ShippingSettings` |
| `lib/cms/products.ts` | Update all 3 GROQ queries and `resolve()` |
| `lib/cms/reviews.ts` | New file |
| `lib/cms/shipping.ts` | New file |
| `lib/cms/index.ts` | Add `export * from './reviews'` and `export * from './shipping'` |
| `app/[locale]/product/page.tsx` | Add `getReviewsByProduct` + `getShippingSettings` to `Promise.all`; pass as props |
| `components/product-detail/SizeSelector.tsx` | Update props to `ProductVariant[]`; add tooltip + stock status logic |
| `components/product-detail/SizeSelector.styles.ts` | Add dashed/greyed-out/tooltip styled variants using theme tokens |
| `components/product-detail/ProductDetail.tsx` | Pass `variants`; derive min price; add `ShippingSection` + `ReviewsSection` |
| `components/product-detail/ShippingSection.tsx` | New file |
| `components/product-detail/ShippingSection.styles.ts` | New file |
| `components/product-detail/ReviewsSection.tsx` | New file |
| `components/product-detail/ReviewsSection.styles.ts` | New file |
| `components/product-detail/index.ts` | Export new components |
| `lang/en.json` | Add `product.outOfStock`, `product.fewLeft`, `product.reviews.*`, `product.shipping.*` |
| `lang/he.json` | Same keys in Hebrew |

---

## 6. Out of Scope

- ~~Customer-facing review submission form~~ — moved in scope, see `2026-03-23-review-submission-design.md`
- International shipping zones
- Inventory count tracking (exact numbers)
- Payments / checkout integration
- Category filter wiring in `FilterBar` (schema only, not UI filter logic)

---

## 7. Branch & Testing Strategy

- Branch: `feat/ecommerce-schema`
- After implementation, run `npm run dev` and test manually on local dev server
- User approves → merge to `main`
- No automated migration script needed: existing Sanity documents will show empty `variants` arrays; editor fills them in Studio before going live
