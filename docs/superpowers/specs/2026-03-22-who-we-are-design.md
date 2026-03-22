# Who We Are — Page Design Spec

**Date:** 2026-03-22
**Status:** Approved
**Route:** `app/[locale]/about/page.tsx` → URL `/[locale]/about`

> Note: The existing `components/about/` folder contains `AboutSection` which is a **section on the homepage**, not a page. This spec creates a new standalone page at `/about`. There is no conflict.

---

## Overview

A dedicated "Who We Are" page for The Valley Olive Oil (Olivum). The page uses a chapters-based editorial structure: a cinematic dark hero quote followed by three alternating image+text chapter sections, a stats bar, and a CTA. The tone is premium, restrained, and editorial — consistent with the existing brand aesthetic.

GSAP is already available in this project via `import { gsap, ScrollTrigger } from '@/lib/gsap'` and `import { useGSAP } from '@gsap/react'` (see `components/about/AboutSection.tsx` for the pattern to follow).

---

## Page Structure

### 1. Dark Hero Quote
- Full-bleed dark section (`theme.colors.textDark` background)
- Fields: `heroQuote` (localizedString), `heroSubtitle` (localizedString)
- Eyebrow label "WHO WE ARE" in small caps, faded
- Large bold headline from `heroQuote`, centered
- Thin rule divider
- One-paragraph subtitle from `heroSubtitle`
- Animates in on page load (fade + slight translate)

### 2. Chapter Sections (×3)
Each chapter renders as: chapter number badge + label header strip, then a two-column layout with image on one side and text on the other. Chapters alternate sides (Ch.01 image-left, Ch.02 image-right, Ch.03 image-left). Background alternates: white / `sectionGreen` / white.

`ChapterSection` is a **server component** (no `'use client'`). It renders markup with GSAP-targeting class names (e.g. `.wwa-chapter-img`, `.wwa-chapter-heading`). `WhoWeArePage` (client) owns all GSAP animations and targets these class names via `gsap.matchMedia()` scroll triggers — same pattern as `AboutSection.tsx`.

**Chapter content (all localizedString where on-site):**
- `label` — short all-caps chapter name (e.g. "THE LAND")
- `heading` — 2–3 word bold chapter headline (e.g. "THE GALILEE FOOTHILLS")
- `body` — 2–4 sentence paragraph
- `image` — Sanity image with hotspot
- `side` — string enum `'left' | 'right'` (controls which side the image appears)

**Default content (seeded in Sanity):**

| # | Label | Heading | Body (EN) | Side | bg |
|---|-------|---------|-----------|------|----|
| 1 | THE LAND | THE GALILEE FOOTHILLS | Our groves sit at 600m elevation in the northern valleys. The rocky limestone soil, cool nights, and generous sun create the mineral-forward flavor profile that defines every bottle we produce. | left | white |
| 2 | THE PROCESS | COLD PRESSED WITHIN 4 HOURS | From picking to press, nothing takes longer than four hours. No heat, no chemicals, no shortcuts. Just gravity, stone, and patience — the same way it's been done in this valley for centuries. | right | sectionGreen |
| 3 | OUR PROMISE | HONEST OIL, EVERY BOTTLE | No blending, no additives, no industrial shortcuts. Every bottle carries a harvest year and grove origin. If we wouldn't serve it at our table, we won't sell it at yours. | left | white |

**Animations (GSAP scroll-trigger, `once: true`, driven from `WhoWeArePage`):**
- `.wwa-chapter-img` — slides in from its side (x: ±20, opacity 0→1, duration 0.9)
- `.wwa-chapter-badge` — fades in (opacity 0→1, duration 0.4)
- `.wwa-chapter-heading` — fades up (y: 16, opacity 0→1, duration 0.6, delay 0.15)
- `.wwa-chapter-rule` — scaleX 0→1 (duration 0.4, delay 0.3)
- `.wwa-chapter-body` — fades in (opacity 0→1, duration 0.5, delay 0.4)

### 3. Stats Bar
Full-width dark band (`theme.colors.textDark`). Reuses the same `stats[]` array shape as the existing `about` document (same `AboutStat` / `RawAboutStat` types — no new types needed for stats). 4 stats seeded:

| num | label (EN) | label (HE) | dark |
|-----|------------|------------|------|
| 2009 | FOUNDED | נוסד | false |
| 4 | GROVES | חורשות | false |
| 0.2% | MAX ACIDITY | חומציות מקסימלית | false |
| 100% | COLD PRESSED | כבישה קרה | false |

### 4. CTA Section
Background: `sectionGreen`. Center-aligned. Fields: `ctaEyebrow`, `ctaHeading`, `ctaLabel` (all localizedString). Button links to `/[locale]/shop`. Fades in on scroll-enter.

**Default content:**
- Eyebrow: "READY TO TASTE IT?" / "מוכנים לטעום?"
- Heading: "TASTE THE VALLEY." / "טעמו את העמק."
- CTA label: "SHOP OUR OILS" / "לחנות שלנו"

---

## Sanity Schema — `studio/schemaTypes/whoweare.ts`

Single document type (like `about` and `hero`). Registered in `studio/schemaTypes/index.ts`.

```ts
import { defineType, defineField } from 'sanity'

export const whoweare = defineType({
  name: 'whoweare',
  title: 'Who We Are',
  type: 'document',
  fields: [
    defineField({ name: 'heroQuote',    title: 'Hero Quote',    type: 'localizedString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'localizedString' }),
    defineField({
      name: 'chapters', title: 'Chapters', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'label',   type: 'localizedString' }),
        defineField({ name: 'heading', type: 'localizedString' }),
        defineField({ name: 'body',    type: 'localizedString' }),
        defineField({ name: 'image',   type: 'image', options: { hotspot: true } }),
        defineField({ name: 'side',    type: 'string' }),  // 'left' | 'right'
      ]}],
    }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'id',    type: 'string' }),
        defineField({ name: 'num',   type: 'string' }),
        defineField({ name: 'label', type: 'localizedString' }),
        defineField({ name: 'dark',  type: 'boolean' }),
      ]}],
    }),
    defineField({ name: 'ctaEyebrow', title: 'CTA Eyebrow', type: 'localizedString' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'localizedString' }),
    defineField({ name: 'ctaLabel',   title: 'CTA Label',   type: 'localizedString' }),
  ],
})
```

---

## CMS Data Layer — `lib/cms/whoWeAre.ts`

Follows the standard `RawXxx → resolve() → Xxx` pattern. Module exported from `lib/cms/index.ts`.

**Types added to `lib/cms/types.ts`:**

```ts
// Resolved types
export interface WhoWeAreChapter {
  label: string
  heading: string
  body: string
  image: string
  side: 'left' | 'right'
}

export interface WhoWeAreContent {
  heroQuote: string
  heroSubtitle: string
  chapters: WhoWeAreChapter[]
  stats: AboutStat[]        // reuses existing AboutStat type
  ctaEyebrow: string
  ctaHeading: string
  ctaLabel: string
}

// Raw types (before locale resolution)
export interface RawWhoWeAreChapter {
  label: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  image: string             // resolved via GROQ asset->url
  side: 'left' | 'right'
}

export interface RawWhoWeAreContent {
  heroQuote: LocalizedString
  heroSubtitle: LocalizedString
  chapters: RawWhoWeAreChapter[]
  stats: RawAboutStat[]     // reuses existing RawAboutStat type
  ctaEyebrow: LocalizedString
  ctaHeading: LocalizedString
  ctaLabel: LocalizedString
}
```

**GROQ query and resolver in `lib/cms/whoWeAre.ts`:**

```ts
import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, WhoWeAreContent, RawWhoWeAreContent } from './types'

const WHO_WE_ARE_QUERY = defineQuery(`
  *[_type == "whoweare"][0] {
    heroQuote, heroSubtitle,
    "chapters": chapters[] {
      label, heading, body,
      "image": image.asset->url,
      side
    },
    "stats": stats[] { id, num, label, dark },
    ctaEyebrow, ctaHeading, ctaLabel
  }
`)

function resolve(raw: RawWhoWeAreContent, locale: Locale): WhoWeAreContent {
  return {
    heroQuote:    raw.heroQuote[locale],
    heroSubtitle: raw.heroSubtitle[locale],
    chapters: raw.chapters.map((c) => ({
      label:   c.label[locale],
      heading: c.heading[locale],
      body:    c.body[locale],
      image:   c.image,
      side:    c.side,
    })),
    stats: raw.stats.map((s) => ({
      id:    s.id,
      num:   s.num,
      label: s.label[locale],
      dark:  s.dark,
    })),
    ctaEyebrow: raw.ctaEyebrow[locale],
    ctaHeading: raw.ctaHeading[locale],
    ctaLabel:   raw.ctaLabel[locale],
  }
}

export async function getWhoWeAreContent(locale: Locale): Promise<WhoWeAreContent> {
  const raw = await sanityClient.fetch(WHO_WE_ARE_QUERY) as RawWhoWeAreContent
  return resolve(raw, locale)
}
```

---

## Components — `components/who-we-are/`

```
components/who-we-are/
  WhoWeArePage.tsx          ← 'use client', GSAP shell, renders all sections
  WhoWeArePage.styles.ts    ← page-level styled components
  ChapterSection.tsx        ← server component, renders one chapter
  ChapterSection.styles.ts  ← chapter layout styled components
  index.ts                  ← barrel export
```

**`index.ts` barrel:**
```ts
export { default } from './WhoWeArePage'
export { default as ChapterSection } from './ChapterSection'
```

**`WhoWeArePage`** — `'use client'` (uses `useGSAP`). Holds a `containerRef` on the outer wrapper. Uses `gsap.matchMedia()` with `useGSAP({ scope: containerRef })` to animate GSAP class selectors on scroll. Renders: hero → `chapters.map((c, i) => <ChapterSection chapter={c} index={i} />)` → stats bar → CTA.

**`ChapterSection`** — pure server component (no `'use client'`). Props: `chapter: WhoWeAreChapter`, `index: number`. Renders chapter header strip + two-column image/text layout. Image side determined by `chapter.side`. Each element carries a GSAP target class (`.wwa-chapter-img`, `.wwa-chapter-heading`, etc.).

---

## Route — `app/[locale]/about/page.tsx`

Server component. Includes `generateMetadata` for page title/description. Fetches `getWhoWeAreContent(loc)` and `getNavigation(loc)` in parallel. Renders `<Header>`, `<main><WhoWeArePage content={content} /></main>`, `<Footer>`.

```ts
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'whoWeAre' })
  return { title: t('pageTitle'), description: t('pageDescription') }
}
```

---

## i18n

**Static strings** added to both `lang/en.json` and `lang/he.json`:

```json
// lang/en.json
{
  "whoWeAre": {
    "pageTitle": "Who We Are — The Valley Olive Oil",
    "pageDescription": "The story behind The Valley Olive Oil — our land, craft, and promise.",
    "chapterAriaLabel": "Chapter {num}"
  }
}
```

```json
// lang/he.json
{
  "whoWeAre": {
    "pageTitle": "מי אנחנו — The Valley Olive Oil",
    "pageDescription": "הסיפור מאחורי שמן הזית של העמק — האדמה, המלאכה, וההבטחה שלנו.",
    "chapterAriaLabel": "פרק {num}"
  }
}
```

All visible page content (quote, chapter text, stats labels, CTA) is dynamic via CMS `localizedString` fields.

---

## Registration Checklist

- [ ] `studio/schemaTypes/whoweare.ts` created
- [ ] `whoweare` imported and added to `schemaTypes` array in `studio/schemaTypes/index.ts`
- [ ] `RawWhoWeAreChapter`, `RawWhoWeAreContent`, `WhoWeAreChapter`, `WhoWeAreContent` added to `lib/cms/types.ts`
- [ ] `lib/cms/whoWeAre.ts` created
- [ ] `export * from './whoWeAre'` added to `lib/cms/index.ts`
- [ ] `components/who-we-are/` folder created with all 5 files
- [ ] `whoWeAre` keys added to both `lang/en.json` and `lang/he.json`
- [ ] `app/[locale]/about/page.tsx` created

---

## Conventions Compliance

- All styles in `.styles.ts` — zero `styled.*` or `style={{}}` in `.tsx`
- All colors from `theme.colors.*` — no raw hex values
- All breakpoints via `media.belowXx` helpers from `@/styles/media`
- `'use client'` only on `WhoWeArePage` (GSAP) — `ChapterSection` is a server component
- CMS data fetched only in `app/[locale]/about/page.tsx` server component
- Both `en.json` and `he.json` updated together, keys nested under `whoWeAre`
- New schema registered in `studio/schemaTypes/index.ts`
- New CMS module re-exported from `lib/cms/index.ts`
- GROQ images resolved via `"image": image.asset->url`
- GSAP imported from `@/lib/gsap`, `useGSAP` from `@gsap/react`
