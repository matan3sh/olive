# Who We Are Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone `/[locale]/about` page for The Valley Olive Oil with a cinematic dark hero, three alternating image+text chapter sections, a stats bar, and a CTA — all driven by a new `whoweare` Sanity document.

**Architecture:** New `whoweare` Sanity document type feeds a `getWhoWeAreContent()` CMS function → server component page → `WhoWeArePage` client component (GSAP shell) + `ChapterSection` server component (pure markup). Follows the identical `RawXxx → resolve() → Xxx` CMS pattern used by every existing content type in this project.

**Tech Stack:** Next.js 16 App Router, TypeScript, Sanity v5, Styled Components v6, GSAP + @gsap/react, next-intl

**Spec:** `docs/superpowers/specs/2026-03-22-who-we-are-design.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `studio/schemaTypes/whoweare.ts` | Sanity document schema |
| Modify | `studio/schemaTypes/index.ts` | Register new schema |
| Modify | `lib/cms/types.ts` | Add Raw + resolved interfaces |
| Create | `lib/cms/whoWeAre.ts` | GROQ query + resolve() + getWhoWeAreContent() |
| Modify | `lib/cms/index.ts` | Re-export new CMS module |
| Modify | `lang/en.json` | Add `whoWeAre` namespace keys |
| Modify | `lang/he.json` | Add `whoWeAre` namespace keys (Hebrew) |
| Create | `components/who-we-are/ChapterSection.styles.ts` | Styled components for one chapter |
| Create | `components/who-we-are/ChapterSection.tsx` | Server component: renders one chapter |
| Create | `components/who-we-are/WhoWeArePage.styles.ts` | Styled components for hero, stats, CTA |
| Create | `components/who-we-are/WhoWeArePage.tsx` | Client component: GSAP shell, assembles page |
| Create | `components/who-we-are/index.ts` | Barrel export |
| Create | `app/[locale]/about/page.tsx` | Server route: fetches data, renders page |

---

## Task 1 — Sanity Schema

**Files:**
- Create: `studio/schemaTypes/whoweare.ts`
- Modify: `studio/schemaTypes/index.ts`

- [ ] **Create `studio/schemaTypes/whoweare.ts`**

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
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label',   title: 'Label',   type: 'localizedString' }),
          defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
          defineField({ name: 'body',    title: 'Body',    type: 'localizedString' }),
          defineField({ name: 'image',   title: 'Image',   type: 'image', options: { hotspot: true } }),
          defineField({ name: 'side',    title: 'Image side (left | right)', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'id',   type: 'string' }),
          defineField({ name: 'num',  type: 'string' }),
          defineField({ name: 'label', type: 'localizedString' }),
          defineField({ name: 'dark', type: 'boolean' }),
        ],
      }],
    }),
    defineField({ name: 'ctaEyebrow', title: 'CTA Eyebrow', type: 'localizedString' }),
    defineField({ name: 'ctaHeading', title: 'CTA Heading', type: 'localizedString' }),
    defineField({ name: 'ctaLabel',   title: 'CTA Label',   type: 'localizedString' }),
  ],
})
```

- [ ] **Register in `studio/schemaTypes/index.ts`** — add import and add to array:

```ts
import { localizedString } from './localizedString'
import { product } from './product'
import { testimonial } from './testimonial'
import { about } from './about'
import { hero } from './hero'
import { navigation } from './navigation'
import { whoweare } from './whoweare'

export const schemaTypes = [localizedString, product, testimonial, about, hero, navigation, whoweare]
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Commit**

```bash
git add studio/schemaTypes/whoweare.ts studio/schemaTypes/index.ts
git commit -m "feat(cms): add whoweare Sanity schema"
```

---

## Task 2 — CMS Types + Data Layer

**Files:**
- Modify: `lib/cms/types.ts`
- Create: `lib/cms/whoWeAre.ts`
- Modify: `lib/cms/index.ts`

- [ ] **Add interfaces to `lib/cms/types.ts`** — append after the `Navigation` interface at the end of the file:

```ts
// ─── Who We Are ───────────────────────────────────────────────────────────────

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
  stats: AboutStat[]       // reuses existing AboutStat
  ctaEyebrow: string
  ctaHeading: string
  ctaLabel: string
}

export interface RawWhoWeAreChapter {
  label: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  image: string            // resolved via GROQ asset->url
  side: 'left' | 'right'
}

export interface RawWhoWeAreContent {
  heroQuote: LocalizedString
  heroSubtitle: LocalizedString
  chapters: RawWhoWeAreChapter[]
  stats: RawAboutStat[]    // reuses existing RawAboutStat
  ctaEyebrow: LocalizedString
  ctaHeading: LocalizedString
  ctaLabel: LocalizedString
}
```

- [ ] **Create `lib/cms/whoWeAre.ts`**

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

- [ ] **Register in `lib/cms/index.ts`** — append one line:

```ts
export * from './types'
export * from './products'
export * from './testimonials'
export * from './about'
export * from './hero'
export * from './navigation'
export * from './whoWeAre'   // ← add this
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Commit**

```bash
git add lib/cms/types.ts lib/cms/whoWeAre.ts lib/cms/index.ts
git commit -m "feat(cms): add WhoWeAreContent types and getWhoWeAreContent query"
```

---

## Task 3 — i18n Strings

**Files:**
- Modify: `lang/en.json`
- Modify: `lang/he.json`

- [ ] **Add to `lang/en.json`** — insert after the `"cart"` block (before the final `}`):

```json
  "whoWeAre": {
    "pageTitle": "Who We Are — The Valley Olive Oil",
    "pageDescription": "The story behind The Valley Olive Oil — our land, craft, and promise.",
    "heroEyebrow": "WHO WE ARE",
    "chapterAriaLabel": "Chapter {num}"
  }
```

- [ ] **Add to `lang/he.json`** — insert after the `"cart"` block (before the final `}`):

```json
  "whoWeAre": {
    "pageTitle": "מי אנחנו — The Valley Olive Oil",
    "pageDescription": "הסיפור מאחורי שמן הזית של העמק — האדמה, המלאכה, וההבטחה שלנו.",
    "heroEyebrow": "מי אנחנו",
    "chapterAriaLabel": "פרק {num}"
  }
```

- [ ] **Commit**

```bash
git add lang/en.json lang/he.json
git commit -m "feat(i18n): add whoWeAre namespace for about page"
```

---

## Task 4 — ChapterSection Component

**Files:**
- Create: `components/who-we-are/ChapterSection.styles.ts`
- Create: `components/who-we-are/ChapterSection.tsx`

- [ ] **Create `components/who-we-are/ChapterSection.styles.ts`**

```ts
import styled from 'styled-components'
import { media } from '@/styles/media'

export const ChapterWrapper = styled.section<{ $index: number }>`
  background-color: ${({ $index, theme }) =>
    $index % 2 === 0 ? theme.colors.white : theme.colors.sectionGreen};
  width: 100%;
  overflow: hidden;
`

export const ChapterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionBorder};

  ${media.belowMd`
    padding: 14px 24px;
  `}
`

export const ChapterBadge = styled.span`
  background: ${({ theme }) => theme.colors.textDark};
  color: ${({ theme }) => theme.colors.sectionGreen};
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 2px 7px;
`

export const ChapterLabel = styled.span`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.5;
`

export const ChapterColumns = styled.div<{ $side: 'left' | 'right' }>`
  display: flex;
  flex-direction: ${({ $side }) => ($side === 'right' ? 'row-reverse' : 'row')};
  min-height: 380px;

  ${media.belowMd`
    flex-direction: column;
  `}
`

export const ChapterImageCol = styled.div`
  width: 42%;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  ${media.belowMd`
    width: 100%;
    aspect-ratio: 4/3;
  `}
`

export const ChapterTextCol = styled.div`
  flex: 1;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.belowMd`
    padding: 32px 24px;
  `}
`

export const ChapterHeading = styled.h2`
  font-size: clamp(1.4rem, 2.5vw, 36px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-transform: uppercase;
  margin-bottom: 16px;
`

export const ChapterRule = styled.div`
  width: 20px;
  height: 2px;
  background: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 16px;
  transform-origin: left center;
`

export const ChapterBodyText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.75;
  opacity: 0.7;
`
```

- [ ] **Create `components/who-we-are/ChapterSection.tsx`**

```tsx
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { WhoWeAreChapter } from '@/lib/cms'
import {
  ChapterWrapper,
  ChapterHeader,
  ChapterBadge,
  ChapterLabel,
  ChapterColumns,
  ChapterImageCol,
  ChapterTextCol,
  ChapterHeading,
  ChapterRule,
  ChapterBodyText,
} from './ChapterSection.styles'

interface Props {
  chapter: WhoWeAreChapter
  index: number
  locale: string
}

export default async function ChapterSection({ chapter, index, locale }: Props) {
  const num = String(index + 1).padStart(2, '0')
  const t = await getTranslations({ locale, namespace: 'whoWeAre' })

  return (
    <ChapterWrapper
      $index={index}
      className={`wwa-chapter-${index}`}
      aria-label={t('chapterAriaLabel', { num: index + 1 })}
    >
      <ChapterHeader>
        <ChapterBadge className="wwa-chapter-badge">{num}</ChapterBadge>
        <ChapterLabel className="wwa-chapter-badge">{chapter.label}</ChapterLabel>
      </ChapterHeader>
      <ChapterColumns $side={chapter.side}>
        <ChapterImageCol className="wwa-chapter-img">
          <Image
            src={chapter.image}
            alt={chapter.heading}
            fill
            sizes="(max-width: 767px) 100vw, 42vw"
            style={{ objectFit: 'cover' }}
          />
        </ChapterImageCol>
        <ChapterTextCol>
          <ChapterHeading className="wwa-chapter-heading">{chapter.heading}</ChapterHeading>
          <ChapterRule className="wwa-chapter-rule" />
          <ChapterBodyText className="wwa-chapter-body">{chapter.body}</ChapterBodyText>
        </ChapterTextCol>
      </ChapterColumns>
    </ChapterWrapper>
  )
}
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Commit**

```bash
git add components/who-we-are/ChapterSection.styles.ts components/who-we-are/ChapterSection.tsx
git commit -m "feat(who-we-are): add ChapterSection server component"
```

---

## Task 5 — WhoWeArePage Component + Barrel

**Files:**
- Create: `components/who-we-are/WhoWeArePage.styles.ts`
- Create: `components/who-we-are/WhoWeArePage.tsx`
- Create: `components/who-we-are/index.ts`

- [ ] **Create `components/who-we-are/WhoWeArePage.styles.ts`**

```ts
import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'
import { darkButtonBase } from '@/styles/mixins'

export const PageWrapper = styled.div`
  width: 100%;
`

export const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.textDark};
  padding: 80px 32px;
  text-align: center;

  ${media.belowMd`
    padding: 60px 24px;
  `}
`

export const HeroEyebrow = styled.div`
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.45;
  margin-bottom: 20px;
`

export const HeroQuote = styled.h1`
  font-size: clamp(1.8rem, 4vw, 52px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.sectionGreen};
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-transform: uppercase;
  max-width: 600px;
  margin: 0 auto 24px;
`

export const HeroRule = styled.div`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.4;
  margin: 0 auto 24px;
  transform-origin: center;
`

export const HeroSubtitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.6;
  line-height: 1.75;
  max-width: 440px;
  margin: 0 auto;
`

export const StatsBar = styled.div`
  background-color: ${({ theme }) => theme.colors.textDark};
  padding: 40px 32px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;

  ${media.belowMd`
    padding: 32px 24px;
    gap: 20px;
  `}
`

export const StatCell = styled.div<{ $dark?: boolean }>`
  text-align: center;
  background: ${({ $dark, theme }) => ($dark ? theme.colors.white : 'transparent')};
  padding: ${({ $dark }) => ($dark ? '12px 20px' : '0')};
`

export const StatNum = styled.div<{ $dark?: boolean }>`
  font-size: clamp(1.4rem, 2.5vw, 32px);
  font-weight: 900;
  color: ${({ $dark, theme }) => ($dark ? theme.colors.textDark : theme.colors.sectionGreen)};
  letter-spacing: -0.02em;
`

export const StatLabel = styled.div<{ $dark?: boolean }>`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ $dark, theme }) => ($dark ? theme.colors.textDark : theme.colors.sectionGreen)};
  opacity: 0.45;
  margin-top: 4px;
`

export const CtaSection = styled.section`
  background-color: ${({ theme }) => theme.colors.sectionGreen};
  padding: 72px 24px;
  text-align: center;

  ${media.belowMd`
    padding: 52px 24px;
  `}
`

export const CtaEyebrow = styled.div`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.45;
  margin-bottom: 12px;
`

export const CtaHeading = styled.h2`
  font-size: clamp(1.6rem, 3vw, 42px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 24px;
`

export const CtaButton = styled(Link)`
  ${darkButtonBase}
  min-width: 180px;
  height: 50px;
  font-size: 10px;
`
```

- [ ] **Create `components/who-we-are/WhoWeArePage.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { WhoWeAreContent } from '@/lib/cms'
import ChapterSection from './ChapterSection'
import {
  PageWrapper,
  HeroSection,
  HeroEyebrow,
  HeroQuote,
  HeroRule,
  HeroSubtitle,
  StatsBar,
  StatCell,
  StatNum,
  StatLabel,
  CtaSection,
  CtaEyebrow,
  CtaHeading,
  CtaButton,
} from './WhoWeArePage.styles'

interface Props {
  content: WhoWeAreContent
  locale: string
}

export default function WhoWeArePage({ content, locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('whoWeAre')

  useGSAP(() => {
    // Hero — animates on load
    gsap.from('.wwa-hero-eyebrow', { opacity: 0, y: -8, duration: 0.5, ease: 'power2.out' })
    gsap.from('.wwa-hero-quote',   { opacity: 0, y: 24, duration: 0.8, delay: 0.2, ease: 'power2.out' })
    gsap.from('.wwa-hero-rule',    { scaleX: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' })
    gsap.from('.wwa-hero-subtitle', { opacity: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' })

    // Chapters — scroll-triggered, once each
    content.chapters.forEach((chapter, i) => {
      ScrollTrigger.create({
        trigger: `.wwa-chapter-${i}`,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const xFrom = chapter.side === 'left' ? -20 : 20
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
          tl.from(`.wwa-chapter-${i} .wwa-chapter-img`,     { opacity: 0, x: xFrom, duration: 0.9 }, 0)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-badge`,   { opacity: 0, duration: 0.4 }, 0)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-heading`, { opacity: 0, y: 16, duration: 0.6 }, 0.15)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-rule`,    { scaleX: 0, duration: 0.4 }, 0.3)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-body`,    { opacity: 0, duration: 0.5 }, 0.4)
        },
      })
    })

    // Stats bar
    ScrollTrigger.create({
      trigger: '.wwa-stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.wwa-stat', { opacity: 0, y: 8, stagger: 0.07, duration: 0.5, ease: 'power2.out' })
      },
    })

    // CTA
    ScrollTrigger.create({
      trigger: '.wwa-cta',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.wwa-cta', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' })
      },
    })
  }, { scope: containerRef })

  return (
    <PageWrapper ref={containerRef}>
      <HeroSection>
        <HeroEyebrow className="wwa-hero-eyebrow">{t('heroEyebrow')}</HeroEyebrow>
        <HeroQuote className="wwa-hero-quote">{content.heroQuote}</HeroQuote>
        <HeroRule className="wwa-hero-rule" />
        <HeroSubtitle className="wwa-hero-subtitle">{content.heroSubtitle}</HeroSubtitle>
      </HeroSection>

      {content.chapters.map((chapter, i) => (
        <ChapterSection key={chapter.label} chapter={chapter} index={i} locale={locale} />
      ))}

      <StatsBar className="wwa-stats">
        {content.stats.map((stat) => (
          <StatCell key={stat.id} className="wwa-stat" $dark={stat.dark}>
            <StatNum $dark={stat.dark}>{stat.num}</StatNum>
            <StatLabel $dark={stat.dark}>{stat.label}</StatLabel>
          </StatCell>
        ))}
      </StatsBar>

      <CtaSection className="wwa-cta">
        <CtaEyebrow>{content.ctaEyebrow}</CtaEyebrow>
        <CtaHeading>{content.ctaHeading}</CtaHeading>
        <CtaButton href={`/${locale}/shop`}>{content.ctaLabel}</CtaButton>
      </CtaSection>
    </PageWrapper>
  )
}
```

- [ ] **Create `components/who-we-are/index.ts`**

```ts
export { default } from './WhoWeArePage'
export { default as ChapterSection } from './ChapterSection'
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Commit**

```bash
git add components/who-we-are/
git commit -m "feat(who-we-are): add WhoWeArePage client component and barrel"
```

---

## Task 6 — Route Page

**Files:**
- Create: `app/[locale]/about/page.tsx`

- [ ] **Create `app/[locale]/about/page.tsx`**

```tsx
import { getTranslations } from 'next-intl/server'
import { getWhoWeAreContent, getNavigation, type Locale } from '@/lib/cms'
import Header from '@/components/header'
import WhoWeArePage from '@/components/who-we-are'
import Footer from '@/components/footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'whoWeAre' })
  return { title: t('pageTitle'), description: t('pageDescription') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale

  const [content, navigation] = await Promise.all([
    getWhoWeAreContent(loc),
    getNavigation(loc),
  ])

  return (
    <>
      <Header navigation={navigation} />
      <main>
        <WhoWeArePage content={content} locale={locale} />
      </main>
      <Footer navigation={navigation} />
    </>
  )
}
```

- [ ] **Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Verify dev server starts without error**

```bash
npm run dev
```

Navigate to `http://localhost:3000/en/about` — the page should render (will be empty/broken until Sanity content is seeded; that's expected).

- [ ] **Commit**

```bash
git add app/\[locale\]/about/page.tsx
git commit -m "feat(who-we-are): add /about route page"
```

---

## Task 7 — Seed Sanity Content

This task is **manual** — done in the Sanity Studio UI, not in code.

- [ ] **Start the dev server if not already running**

```bash
npm run dev
```

- [ ] **Open Sanity Studio**

Navigate to `http://localhost:3000/studio` → click "Who We Are" in the left panel → click "Create new document".

- [ ] **Fill in Hero fields**

| Field | EN value | HE value |
|-------|----------|----------|
| Hero Quote | ROOTED IN THE VALLEY SINCE 2009. | שורשים בעמק מאז 2009. |
| Hero Subtitle | We are a small family operation from the foothills of the Galilee. Everything we make starts with the land — and ends with the table. | אנו עסק משפחתי קטן מרגלי הגליל. כל מה שאנו מייצרים מתחיל באדמה — ומסתיים על השולחן. |

- [ ] **Add 3 chapters**

Chapter 1:
- Label EN: THE LAND / HE: האדמה
- Heading EN: THE GALILEE FOOTHILLS / HE: רגלי הגליל
- Body EN: Our groves sit at 600m elevation in the northern valleys. The rocky limestone soil, cool nights, and generous sun create the mineral-forward flavor profile that defines every bottle we produce.
- Body HE: החורשות שלנו ממוקמות בגובה 600 מטר בעמקים הצפוניים. הקרקע הגירנית, הלילות הקרירים והשמש הנדיבה יוצרים את פרופיל הטעם העשיר המינרלי שמאפיין כל בקבוק שאנו מייצרים.
- Image: upload any grove/landscape image
- Side: left

Chapter 2:
- Label EN: THE PROCESS / HE: התהליך
- Heading EN: COLD PRESSED WITHIN 4 HOURS / HE: כבישה קרה תוך 4 שעות
- Body EN: From picking to press, nothing takes longer than four hours. No heat, no chemicals, no shortcuts. Just gravity, stone, and patience — the same way it's been done in this valley for centuries.
- Body HE: מהקטיף ועד לכבישה, הכל לוקח פחות מארבע שעות. ללא חום, ללא כימיקלים, ללא קיצורי דרך. רק כוח הכבידה, האבן והסבלנות — כפי שנעשה בעמק הזה במשך מאות שנים.
- Image: upload any press/production image
- Side: right

Chapter 3:
- Label EN: OUR PROMISE / HE: ההבטחה שלנו
- Heading EN: HONEST OIL, EVERY BOTTLE / HE: שמן אמיתי, בכל בקבוק
- Body EN: No blending, no additives, no industrial shortcuts. Every bottle carries a harvest year and grove origin. If we wouldn't serve it at our table, we won't sell it at yours.
- Body HE: ללא עירוב, ללא תוספים, ללא קיצורי דרך תעשייתיים. כל בקבוק נושא שנת קציר ומקור חורשה. אם לא היינו מגישים אותו על השולחן שלנו, לא נמכור אותו על השולחן שלך.
- Image: upload any bottle/product image
- Side: left

- [ ] **Add 4 stats**

| id | num | Label EN | Label HE | dark |
|----|-----|----------|----------|------|
| founded | 2009 | FOUNDED | נוסד | false |
| groves | 4 | GROVES | חורשות | false |
| acidity | 0.2% | MAX ACIDITY | חומציות מקסימלית | false |
| pressed | 100% | COLD PRESSED | כבישה קרה | false |

- [ ] **Fill CTA fields**

| Field | EN | HE |
|-------|----|----|
| CTA Eyebrow | READY TO TASTE IT? | מוכנים לטעום? |
| CTA Heading | TASTE THE VALLEY. | טעמו את העמק. |
| CTA Label | SHOP OUR OILS | לחנות שלנו |

- [ ] **Publish the document** (click the "Publish" button in Sanity Studio)

- [ ] **Verify the page renders correctly**

Visit `http://localhost:3000/en/about` — all sections should display.
Visit `http://localhost:3000/he/about` — Hebrew text + RTL layout should display.

- [ ] **Verify animations play on scroll**

Scroll down the page — each chapter should animate in as it enters the viewport.

---

## Done

All tasks complete. The `/[locale]/about` page is live with:
- Full EN + HE content from Sanity
- 3 animated chapter sections
- Stats bar + CTA
- Responsive layout (mobile: stacked, desktop: side-by-side)
- GSAP scroll animations matching the project's existing animation style
