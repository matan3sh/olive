# Olivum — Claude Code Rules

## Project Overview

- **Name:** The Valley Olive Oil (Olivum) — a premium olive oil e-commerce site
- **Stack:** Next.js 16 App Router, TypeScript, Sanity v5 CMS, next-intl (EN + HE/RTL), Styled Components v6, Ant Design, GSAP
- **Locales:** English (`en`) and Hebrew (`he`). Hebrew is RTL. Both must always be supported.

## Architecture Snapshot

```
app/
  [locale]/[page]/page.tsx    Route pages — async server components
  studio/[[...tool]]/page.tsx Embedded Sanity Studio
components/
  [feature]/                  Feature component folders
    Component.tsx
    Component.styles.ts
    index.ts
lib/
  cms/                        CMS data layer (types, GROQ queries, resolvers)
  sanity.client.ts            Sanity client singleton
studio/
  schemaTypes/                Sanity schema definitions
styles/
  theme.ts                    Design tokens (colors, fonts, breakpoints)
  media.ts                    Responsive media query helpers
  mixins.ts                   Reusable CSS snippets
lang/
  en.json                     Static UI strings — English
  he.json                     Static UI strings — Hebrew
```

## Convention Domains

**Components** — Every feature lives in `components/[feature]/` with exactly three files: `Component.tsx`, `Component.styles.ts`, and `index.ts`. See `docs/conventions/components.md`.

**Styling** — All styles use Styled Components. Colors, breakpoints, and spacing come from `styles/theme.ts`. Media queries use the `media.belowXx` tagged template helpers from `styles/media.ts`. Shared CSS goes in `styles/mixins.ts`. See `docs/conventions/styling.md`.

**Sanity** — Schemas live in `studio/schemaTypes/`. Any text field that appears on the site in both languages uses the `localizedString` type. The CMS data layer in `lib/cms/` follows a strict `RawXxx` → `resolve()` → `Xxx` pattern. See `docs/conventions/sanity.md`.

**i18n** — There are two layers of i18n: static UI strings in `lang/en.json` + `lang/he.json`, and dynamic CMS content via the Sanity `localizedString` type. Never hardcode UI text in components. See `docs/conventions/i18n.md`.

## Golden Rules

- Never write styles inside `.tsx` files. All styles go in `.styles.ts`.
- Never use raw hex values in styles. Always reference `theme.colors.*` or `themeTokens.*`.
- Never hardcode UI strings in components. Use `useTranslations` (client) or `getTranslations` (server).
- Never add a Sanity text field without deciding if it needs `localizedString`. If it appears on-site, it does.
- Never add a new CMS query without a matching `RawXxx` interface, `Xxx` interface, and `resolve()` function in `lib/cms/`.
- Never skip adding `export * from './newFile'` to `lib/cms/index.ts` or `studio/schemaTypes/index.ts`.
- Never fetch CMS data directly in a component. Fetch in the page server component, pass as props.
- Always add keys to **both** `lang/en.json` and `lang/he.json` at the same time.
