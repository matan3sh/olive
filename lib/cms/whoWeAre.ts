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
