import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, ShippingSettings, RawShippingSettings } from './types'

function resolve(raw: RawShippingSettings, locale: Locale): ShippingSettings {
  return {
    zones: raw.zones,
    notes: raw.notes[locale],
  }
}

const SHIPPING_SETTINGS_QUERY = defineQuery(`
  *[_type == "shippingSettings"][0] {
    "zones": zones[] { _key, label, price, estimatedDays, freeThreshold },
    notes
  }
`)

export async function getShippingSettings(locale: Locale): Promise<ShippingSettings | null> {
  const raw = await sanityClient.fetch(SHIPPING_SETTINGS_QUERY)
  return raw ? resolve(raw as RawShippingSettings, locale) : null
}
