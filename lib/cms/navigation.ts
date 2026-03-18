import rawNav from '@/data/navigation.json'
import type { Locale, Navigation, RawNavItem } from './types'

export async function getNavigation(locale: Locale): Promise<Navigation> {
  return {
    header: (rawNav.header as RawNavItem[]).map((item) => ({
      id: item.id,
      href: item.href,
      label: item.label[locale],
    })),
    footer: (rawNav.footer as RawNavItem[]).map((item) => ({
      id: item.id,
      href: item.href,
      label: item.label[locale],
    })),
  }
}
