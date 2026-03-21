# Styling Conventions

**Purpose:** All visual styling in this project uses Styled Components with a shared design token system. This doc defines how to use it correctly.

---

## Rules

1. All styles live in `ComponentName.styles.ts` files. Never write `styled.*` or inline `style={{}}` inside `.tsx` files.
2. All color values come from `theme.colors.*`. Never use raw hex values in style files.
3. All breakpoints use the `media.*` tagged template helpers from `styles/media.ts`. Never write raw `@media` strings.
4. Shared, reusable CSS snippets go in `styles/mixins.ts` as `css\`...\`` exports. Import and compose them in `.styles.ts` files.
5. Never use Tailwind, CSS Modules, or plain CSS files. Styled Components only.
6. Never use inline `style={{}}` props in JSX. If dynamic values are needed, pass them as props to a styled component.
7. The `theme` object is available inside styled-components via `({ theme }) => theme.*`. Use it for colors and header dimensions.
8. Import `themeTokens` directly (not via the theme prop) when you need breakpoint values outside of a media query helper.

---

## Patterns

### Importing design tokens

```ts
// styles/theme.ts — the source of truth
import { theme as themeTokens } from '@/styles/theme'
import { media } from '@/styles/media'
import { darkButtonBase } from '@/styles/mixins'
```

### Using theme colors via the theme prop

```ts
export const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.textDark};
  background-color: ${({ theme }) => theme.colors.sectionGreen};
`
```

### Using media query helpers

```ts
export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;

  ${media.belowLg`
    grid-template-columns: 1fr;
  `}

  ${media.belowSm`
    padding: 32px 20px;
  `}
`
```

Available helpers: `media.belowXl`, `media.belowLg`, `media.belowMd`, `media.belowSm`, `media.aboveLg`.

Breakpoint values (from `styles/theme.ts`):
- `xl`: 1280px
- `lg`: 900px
- `md`: 767px
- `sm`: 480px

### Using mixins

```ts
// styles/mixins.ts exports: hoverUnderline, hoverButton, darkButtonBase
import { darkButtonBase } from '@/styles/mixins'

export const HeroCtaButton = styled(Link)`
  ${darkButtonBase}
  min-width: 160px;
  height: 52px;
  font-size: 11px;
`
```

### Using themeTokens directly (for breakpoints in non-media contexts)

```ts
import { theme as themeTokens } from '@/styles/theme'

export const HeroSectionEl = styled.section`
  height: calc(100vh - ${({ theme }) => theme.header.row1Height});

  @media (max-width: ${themeTokens.breakpoints.md}) {
    height: calc(100vh - ${({ theme }) => theme.header.mobileHeight});
  }
`
```

Note: prefer the `media.*` helpers over raw `@media` — only use the above pattern when a media query is embedded in a calc or complex expression.

### Design token reference

```ts
// styles/theme.ts
colors: {
  white, textDark, textNav, textSubtitle,
  btnDark, sectionGreen, quoteGreen, dotDark,
  navBorder, sectionBorder, muted, imageBg, borderMuted
}
fonts: { inter }
breakpoints: { xl, lg, md, sm }
header: { row1Height, divider, row2Height, mobileHeight }
```

---

## Checklist

- [ ] Are all styles in `.styles.ts`, with zero `styled.*` or `style={{}}` in `.tsx`?
- [ ] Do all color values use `theme.colors.*` — no raw hex strings?
- [ ] Do all responsive breakpoints use `media.belowXx` helpers?
- [ ] Is any new reusable CSS pattern added to `styles/mixins.ts` instead of duplicated?
- [ ] Is any new design token added to `styles/theme.ts` instead of hardcoded inline?
