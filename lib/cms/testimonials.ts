import rawTestimonials from '@/data/testimonials.json'
import type { Locale, Testimonial, RawTestimonial } from './types'

function resolve(t: RawTestimonial, locale: Locale): Testimonial {
  return {
    id: t.id,
    quote: t.quote[locale],
    author: t.author[locale],
  }
}

export async function getTestimonials(locale: Locale): Promise<Testimonial[]> {
  return (rawTestimonials as RawTestimonial[]).map((t) => resolve(t, locale))
}
