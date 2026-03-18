import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, Navigation, RawNavItem } from './types'

const NAV_QUERY = defineQuery(`
  *[_type == "navigation"][0] {
    "header": header[] { id, href, label },
    "footer": footer[] { id, href, label }
  }
`)

export async function getNavigation(locale: Locale): Promise<Navigation> {
  const raw = await sanityClient.fetch(NAV_QUERY) as { header: RawNavItem[]; footer: RawNavItem[] }
  return {
    header: raw.header.map((item) => ({
      id: item.id,
      href: item.href,
      label: item.label[locale],
    })),
    footer: raw.footer.map((item) => ({
      id: item.id,
      href: item.href,
      label: item.label[locale],
    })),
  }
}
