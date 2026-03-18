import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, AboutContent, RawAboutContent } from './types'

const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0] {
    tag, heading, body, "image1": image1.asset->url, "image2": image2.asset->url,
    "stats": stats[] { id, num, label, dark }
  }
`)

export async function getAboutContent(locale: Locale): Promise<AboutContent> {
  const raw = await sanityClient.fetch(ABOUT_QUERY) as RawAboutContent
  return {
    tag: raw.tag[locale],
    heading: raw.heading[locale],
    body: raw.body[locale],
    image1: raw.image1,
    image2: raw.image2,
    stats: raw.stats.map((s) => ({
      id: s.id,
      num: s.num,
      label: s.label[locale],
      dark: s.dark,
    })),
  }
}
