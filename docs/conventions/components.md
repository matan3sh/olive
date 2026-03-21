# Component Conventions

**Purpose:** Every UI feature in this project follows an identical folder structure. This doc defines what that structure is and why.

---

## Rules

1. Every feature gets its own folder under `components/[feature-name]/`. Use kebab-case for folder names.
2. Each folder contains exactly three files: `ComponentName.tsx`, `ComponentName.styles.ts`, and `index.ts`.
3. Additional sub-components for the same feature live in the same folder, not in a sub-folder.
4. The `index.ts` barrel re-exports the default export (and any named types needed by consumers).
5. Component names use PascalCase. File names match the component name exactly.
6. `'use client'` only appears in components that actually use browser APIs, event handlers, or React hooks. Page-level data fetching stays in server components.
7. Props interfaces are defined inline in the component file as `interface Props { ... }`.
8. Never create a component file directly in `components/` root — it must live in a feature folder (except for true one-off globals like `ScrollToTop.tsx`).

---

## Patterns

### Standard feature folder

```
components/
  products/
    ProductCard.tsx           ← main component
    ProductCard.styles.ts     ← all styled-components for this component
    ProductsSection.tsx       ← sibling component in the same feature
    ProductsSection.styles.ts
    index.ts                  ← barrel
```

### index.ts barrel

```ts
// components/products/index.ts
export { default as ProductCard } from './ProductCard'
export { default as ProductsSection } from './ProductsSection'
```

### Props interface

```tsx
// components/products/ProductCard.tsx
interface Props {
  product: Product
  index: number
  fromLabel: string
}

export default function ProductCard({ product, index, fromLabel }: Props) {
  ...
}
```

### Client vs server

```tsx
// 'use client' — only when needed
'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ShopPage({ products }: Props) { ... }
```

```tsx
// No 'use client' — server component, data comes from props
import type { Product } from '@/lib/cms'

export default function ProductsSection({ products }: Props) { ... }
```

### Importing styled components

Always import from the sibling `.styles.ts`, not from another component's styles file.

```tsx
import { ShopWrapper, ProductsGrid } from './ShopPage.styles'
```

---

## Checklist

- [ ] Does the feature have its own folder in `components/`?
- [ ] Are there exactly `ComponentName.tsx`, `ComponentName.styles.ts`, and `index.ts` files?
- [ ] Is `'use client'` only present if this component uses hooks, events, or browser APIs?
- [ ] Does `index.ts` export everything consumers need?
- [ ] Are all styles in `.styles.ts`, with zero CSS/styling inside `.tsx`?
