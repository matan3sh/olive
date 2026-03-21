# Sanity CMS Conventions

**Purpose:** This doc covers how to author Sanity schemas and how to wire up the CMS data layer in `lib/cms/` so new content types follow the exact same pattern as existing ones.

---

## Rules

1. Every Sanity schema lives in its own file at `studio/schemaTypes/[name].ts` and is exported from `studio/schemaTypes/index.ts`.
2. Always use `defineType` and `defineField` from `'sanity'` — never plain object literals.
3. Any text field that will be displayed on the website must use `type: 'localizedString'`, not `type: 'string'`. Non-displayed fields (slugs, IDs, flags, numbers, images) stay as their native type.
4. Every content type in `lib/cms/` gets its own file with: a `RawXxx` interface, an `Xxx` interface, GROQ queries defined with `defineQuery`, a `resolve(raw, locale)` function, and one or more exported async functions.
5. GROQ queries use `defineQuery` from `'groq'` for type safety.
6. Every new `lib/cms/` file must be added to `lib/cms/index.ts` as `export * from './newFile'`.
7. Every new schema type must be added to the `schemaTypes` array in `studio/schemaTypes/index.ts`.
8. CMS data is always fetched in page server components using the functions from `lib/cms`. Never fetch directly from a component.
9. Images are always resolved via `"fieldName": fieldName.asset->url` in GROQ — never pass the raw Sanity image reference to the frontend.

---

## Patterns

### Schema file

```ts
// studio/schemaTypes/product.ts
import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID (slug)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'active', title: 'Active', type: 'boolean' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    // Text displayed on site → localizedString
    defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedString' }),
  ],
})
```

### The localizedString type

```ts
// studio/schemaTypes/localizedString.ts
// Already defined — just reference it as type: 'localizedString' in other schemas.
// It stores { en: string, he: string } — both fields are required.
```

### Registering a new schema

```ts
// studio/schemaTypes/index.ts
import { localizedString } from './localizedString'
import { product } from './product'
import { newType } from './newType'   // ← add import

export const schemaTypes = [localizedString, product, newType]  // ← add to array
```

### CMS data layer file

```ts
// lib/cms/products.ts
import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, Product, RawProduct } from './types'

// 1. resolve() transforms RawXxx (LocalizedString fields) → Xxx (string fields)
function resolve(p: RawProduct, locale: Locale): Product {
  return {
    ...p,
    title: p.title[locale],
    description: p.description[locale],
  }
}

// 2. GROQ queries use defineQuery for type safety
const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && active == true] {
    "id": id, active,
    "image": image.asset->url,
    title, description
  }
`)

// 3. Exported async functions consume the query and call resolve()
export async function getProducts(locale: Locale): Promise<Product[]> {
  const raw = await sanityClient.fetch(PRODUCTS_QUERY)
  return (raw as RawProduct[]).map((p) => resolve(p, locale))
}
```

### Type interfaces

```ts
// lib/cms/types.ts

// Resolved type — what components receive
export interface Product {
  id: string
  image: string
  title: string       // already locale-resolved
  description: string
}

// Raw type — what comes back from Sanity before resolution
export interface RawProduct extends Omit<Product, 'title' | 'description'> {
  title: LocalizedString    // { en: string, he: string }
  description: LocalizedString
}
```

All new interfaces belong in `lib/cms/types.ts`.

### Registering a new CMS module

```ts
// lib/cms/index.ts
export * from './types'
export * from './products'
export * from './newModule'  // ← add this line
```

### Image resolution in GROQ

```groq
// Correct — resolves the asset URL
"image": image.asset->url

// Wrong — never pass the raw Sanity reference to the frontend
image
```

---

## Checklist

- [ ] Is the schema file in `studio/schemaTypes/[name].ts` using `defineType` and `defineField`?
- [ ] Are all on-site text fields typed as `localizedString`?
- [ ] Is the new schema added to `studio/schemaTypes/index.ts`?
- [ ] Does `lib/cms/[name].ts` have `RawXxx` interface, `Xxx` interface, `resolve()`, GROQ query, and exported async function(s)?
- [ ] Are all new interfaces added to `lib/cms/types.ts`?
- [ ] Is the new module re-exported from `lib/cms/index.ts`?
- [ ] Do GROQ image fields use `"field": field.asset->url`?
