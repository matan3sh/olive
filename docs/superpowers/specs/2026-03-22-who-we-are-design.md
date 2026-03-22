# Who We Are — Page Design Spec

**Date:** 2026-03-22
**Status:** Approved
**Route:** `/[locale]/about`

---

## Overview

A dedicated "Who We Are" page for The Valley Olive Oil (Olivum). The page uses a chapters-based editorial structure: a cinematic dark hero quote followed by three alternating image+text chapter sections, a stats bar, and a CTA. The tone is premium, restrained, and editorial — consistent with the existing brand aesthetic.

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

**Chapter content (all localizedString where on-site):**
- `label` — short all-caps chapter name (e.g. "THE LAND")
- `heading` — 2–3 word bold chapter headline (e.g. "THE GALILEE FOOTHILLS")
- `body` — 2–4 sentence paragraph
- `image` — Sanity image with hotspot
- `side` — string enum `'left' | 'right'` (controls which side the image appears)

**Default content (seeded in Sanity):**

| # | Label | Heading | Side | bg |
|---|-------|---------|------|----|
| 1 | THE LAND | THE GALILEE FOOTHILLS | left | white |
| 2 | THE PROCESS | COLD PRESSED WITHIN 4 HOURS | right | sectionGreen |
| 3 | OUR PROMISE | HONEST OIL, EVERY BOTTLE | left | white |

**Animations (GSAP scroll-trigger, once per chapter on enter):**
- Image slides in from its side (x: ±20, opacity 0→1, duration 0.9)
- Chapter badge fades in (opacity 0→1, duration 0.4)
- Heading fades up (y: 16, opacity 0→1, duration 0.6, delay 0.15)
- Rule scaleX 0→1 (duration 0.4, delay 0.3)
- Body fades in (opacity 0→1, duration 0.5, delay 0.4)

### 3. Stats Bar
Full-width dark band (`theme.colors.textDark`). Reuses the same `stats[]` array shape as the existing `about` document. 4 stats: Founded year, number of groves, max acidity %, cold pressed %.

**Default stats:**
- `2009` — FOUNDED
- `4` — GROVES
- `0.2%` — MAX ACIDITY
- `100%` — COLD PRESSED

### 4. CTA Section
Background: `sectionGreen`. Center-aligned. Fields: `ctaEyebrow`, `ctaHeading`, `ctaLabel` (all localizedString). Button links to `/[locale]/shop`. Fades in on scroll-enter.

**Default content:**
- Eyebrow: "READY TO TASTE IT?" / "מוכנים לטעום?"
- Heading: "TASTE THE VALLEY." / "טעמו את העמק."
- CTA label: "SHOP OUR OILS" / "לחנות שלנו"

---

## Sanity Schema — `whoweare`

Single document type (like `about` and `hero`). One document per site.

```
whoweare {
  heroQuote:    localizedString   // required
  heroSubtitle: localizedString   // required
  chapters[]:   array of object {
    label:  localizedString
    heading: localizedString
    body:   localizedString
    image:  image (hotspot: true)
    side:   string ('left' | 'right')
  }
  stats[]:      array of object {  // same shape as about.stats
    id:    string
    num:   string
    label: localizedString
    dark:  boolean
  }
  ctaEyebrow:  localizedString
  ctaHeading:  localizedString
  ctaLabel:    localizedString
}
```

---

## CMS Data Layer — `lib/cms/whoWeAre.ts`

Follows the standard `RawXxx → resolve() → Xxx` pattern.

**Types (added to `lib/cms/types.ts`):**

```ts
interface WhoWeAreChapter {
  label: string
  heading: string
  body: string
  image: string
  side: 'left' | 'right'
}

interface WhoWeAreStat {
  id: string
  num: string
  label: string
  dark: boolean
}

interface WhoWeAreContent {
  heroQuote: string
  heroSubtitle: string
  chapters: WhoWeAreChapter[]
  stats: WhoWeAreStat[]
  ctaEyebrow: string
  ctaHeading: string
  ctaLabel: string
}

// Raw equivalents with LocalizedString for all on-site text fields
```

**Exported function:** `getWhoWeAreContent(locale: Locale): Promise<WhoWeAreContent>`

---

## Components — `components/who-we-are/`

```
components/who-we-are/
  WhoWeArePage.tsx          ← shell, GSAP context, renders all sections
  WhoWeArePage.styles.ts    ← page-level styled components
  ChapterSection.tsx        ← reusable per-chapter component
  ChapterSection.styles.ts  ← chapter layout styled components
  index.ts                  ← barrel export
```

**`WhoWeArePage`** — `'use client'` (uses GSAP). Receives `WhoWeAreContent` as props. Renders: hero → chapters.map(ChapterSection) → stats bar → CTA.

**`ChapterSection`** — no `'use client'` needed unless animated directly; animations driven from parent via GSAP class selectors. Props: `chapter: WhoWeAreChapter`, `index: number`, `bgColor: string`.

---

## Route — `app/[locale]/about/page.tsx`

Server component. Fetches `getWhoWeAreContent(loc)` and `getNavigation(loc)` in parallel. Renders `<Header>`, `<WhoWeArePage>`, `<Footer>`.

---

## i18n

**Static strings** added to `lang/en.json` and `lang/he.json` under `whoWeAre` namespace:
- `whoWeAre.pageTitle` — for `<title>` metadata
- `whoWeAre.pageDescription` — for meta description
- `whoWeAre.chapterLabel` — aria-label for chapter sections (e.g. "Chapter {num}")

All visible content (quote, chapter text, CTA) is dynamic via CMS `localizedString` fields.

---

## Conventions Compliance

- All styles in `.styles.ts` — zero CSS in `.tsx`
- All colors from `theme.colors.*`
- All breakpoints via `media.belowXx` helpers
- `'use client'` only on `WhoWeArePage` (GSAP)
- CMS data fetched only in page server component
- Both `en.json` and `he.json` updated together
- New schema registered in `studio/schemaTypes/index.ts`
- New CMS module re-exported from `lib/cms/index.ts`
- GROQ images resolved via `"image": image.asset->url`
