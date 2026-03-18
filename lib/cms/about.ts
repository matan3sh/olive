import rawAbout from '@/data/about.json'
import type { Locale, AboutContent, RawAboutContent } from './types'

export async function getAboutContent(locale: Locale): Promise<AboutContent> {
  const raw = rawAbout as RawAboutContent
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
