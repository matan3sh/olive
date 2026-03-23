import type { ProductVariant } from '@/lib/cms'

export function deriveMinPrice(variants: ProductVariant[] | undefined): string {
  if (!variants || variants.length === 0) return ''
  const prices = variants
    .map((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')))
    .filter((n) => !isNaN(n))
  if (prices.length === 0) return variants[0].price
  const min = Math.min(...prices)
  const match = variants.find((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')) === min)
  return match?.price ?? variants[0].price
}

export function deriveMinPriceNumeric(variants: ProductVariant[] | undefined): number {
  if (!variants || variants.length === 0) return 0
  const prices = variants
    .map((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')))
    .filter((n) => !isNaN(n))
  return prices.length > 0 ? Math.min(...prices) : 0
}
