import rawProducts from '@/data/products.json'
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

export async function getProducts(locale: Locale): Promise<Product[]> {
  return (rawProducts as RawProduct[])
    .filter((p) => p.active)
    .map((p) => resolve(p, locale))
}

export async function getProductById(id: string, locale: Locale): Promise<Product | null> {
  const raw = (rawProducts as RawProduct[]).find((p) => p.id === id) ?? null
  return raw ? resolve(raw, locale) : null
}

export async function getAllProducts(locale: Locale): Promise<Product[]> {
  return (rawProducts as RawProduct[]).map((p) => resolve(p, locale))
}
