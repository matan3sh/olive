import { defineQuery } from 'groq'
import { sanityClient } from '@/lib/sanity.client'
import type { Locale, Testimonial, RawTestimonial } from './types'

function resolve(t: RawTestimonial, locale: Locale): Testimonial {
  return {
    id: t.id,
    quote: t.quote[locale],
    author: t.author[locale],
  }
}

const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] { "id": id, quote, author }
`)

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  const raw = await sanityClient.fetch(TESTIMONIALS_QUERY)
  return (raw as RawTestimonial[]).map((t) => resolve(t, locale))
}
