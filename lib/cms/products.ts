import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, Product, RawProduct } from './types'

function resolve(p: RawProduct, locale: Locale): Product {
  return {
    ...p,
    title: p.title[locale],
    subtitle: p.subtitle[locale],
    description: p.description[locale],
    origin: p.origin[locale],
    harvest: p.harvest[locale],
  }
}

const RAW_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && active == true] {
    "id": id, active, featured, variants, category,
    "image": image.asset->url, fit, acidity, title, subtitle, description, origin, harvest
  }
`)

const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    "id": id, active, featured, variants, category,
    "image": image.asset->url, fit, acidity, title, subtitle, description, origin, harvest
  }
`)

const PRODUCT_BY_ID_QUERY = defineQuery(`
  *[_type == "product" && id == $id][0] {
    "id": id, active, featured, variants, category,
    "image": image.asset->url, fit, acidity, title, subtitle, description, origin, harvest
  }
`)

export async function getProducts(locale: Locale): Promise<Product[]> {
  const raw = await sanityClient.fetch(RAW_PRODUCTS_QUERY)
  return (raw as RawProduct[]).map((p) => resolve(p, locale))
}

export async function getProductById(id: string, locale: Locale): Promise<Product | null> {
  const raw = await sanityClient.fetch(PRODUCT_BY_ID_QUERY, { id })
  return raw ? resolve(raw as RawProduct, locale) : null
}

export async function getAllProducts(locale: Locale): Promise<Product[]> {
  const raw = await sanityClient.fetch(ALL_PRODUCTS_QUERY)
  return (raw as RawProduct[]).map((p) => resolve(p, locale))
}
