import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Review, RawReview } from './types'

function resolve(r: RawReview): Review {
  return { ...r }
}

const REVIEWS_BY_PRODUCT_QUERY = defineQuery(`
  *[_type == "review" && product == $productId && approved == true && emailVerified == true] | order(date desc) {
    "_id": _id, product, author, rating, quote, "date": date
  }
`)

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const raw = await sanityClient.fetch(REVIEWS_BY_PRODUCT_QUERY, { productId })
  return (raw as RawReview[]).map(resolve)
}
