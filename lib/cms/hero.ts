import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, HeroContent, RawHeroContent } from './types'

const HERO_QUERY = defineQuery(`
  *[_type == "hero"][0] {
    tag, title, subtitle, cta, sideLabel, "backgroundImage": backgroundImage.asset->url, video
  }
`)

export async function getHeroContent(locale: Locale): Promise<HeroContent> {
  const raw = await sanityClient.fetch(HERO_QUERY) as RawHeroContent
  return {
    tag: raw.tag[locale],
    title: raw.title[locale],
    subtitle: raw.subtitle[locale],
    cta: raw.cta[locale],
    sideLabel: raw.sideLabel[locale],
    backgroundImage: raw.backgroundImage,
    video: raw.video,
  }
}
