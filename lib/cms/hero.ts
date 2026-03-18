import rawHero from '@/data/hero.json'
import type { Locale, HeroContent, RawHeroContent } from './types'

export async function getHeroContent(locale: Locale): Promise<HeroContent> {
  const raw = rawHero as RawHeroContent
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
