'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import {
  TestimonialsSectionEl,
  TestimonialsInner,
  TestimonialsAccentCol,
  TestimonialsLargeNum,
  TestimonialsContentCol,
  TestimonialsSectionTag,
  TestimonialsHeading,
  QuoteText,
  QuoteAuthor,
  DotsRow,
  Dot,
} from './TestimonialsSection.styles'

const TESTIMONIALS = [
  {
    quote: '"I was looking for pure extra virgin olive oil and I found it. I must say that it is by far the best quality extra virgin olive oil I have found at this price point."',
    author: '— Emma Anderson, Housewife',
  },
  {
    quote: '"The richness and depth of flavor in every bottle is unmatched. You can truly taste the difference of fresh-pressed, single-origin oil."',
    author: '— James Carter, Chef',
  },
  {
    quote: '"Finally an olive oil that lives up to its promises. Cold pressed, single origin, and absolutely delicious on everything."',
    author: '— Sofia Mendez, Food Blogger',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const testimonial = TESTIMONIALS[active]
  const containerRef = useRef<HTMLElement>(null)
  const t = useTranslations('testimonials')

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
      tl.from('.testimonials-num', { opacity: 0, scale: 0.92, duration: 0.8 }, 0)
      tl.from('.testimonials-tag', { opacity: 0, x: -8, duration: 0.5 }, 0.15)
      tl.from('.testimonials-heading', { opacity: 0, y: 16, duration: 0.6 }, 0.2)
      tl.from('.quote-border', { scaleY: 0, transformOrigin: 'top center', duration: 0.5 }, 0.35)
      tl.from('.quote-text', { opacity: 0, y: 10, duration: 0.6 }, 0.45)
      tl.from('.quote-author', { opacity: 0, duration: 0.4 }, 0.6)
      tl.from('.dots-row', { opacity: 0, duration: 0.4 }, 0.7)
    })

    mm.add('(max-width: 900px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.testimonials-tag', { opacity: 0, duration: 0.4, ease: 'power2.out' })
          gsap.from('.testimonials-heading', { opacity: 0, y: 10, duration: 0.5, delay: 0.1, ease: 'power2.out' })
          gsap.from('.quote-text', { opacity: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' })
        },
      })
    })
  }, { scope: containerRef })

  return (
    <TestimonialsSectionEl ref={containerRef} aria-label="Customer testimonials">
      <TestimonialsInner>

        {/* Large accent number — desktop only */}
        <TestimonialsAccentCol>
          <TestimonialsLargeNum className="testimonials-num">&quot;</TestimonialsLargeNum>
        </TestimonialsAccentCol>

        <TestimonialsContentCol>
          <TestimonialsSectionTag className="testimonials-tag">
            {t('tag')}
          </TestimonialsSectionTag>

          <TestimonialsHeading className="testimonials-heading">
            {t('heading')}
          </TestimonialsHeading>

          <QuoteText key={active} className="quote-text quote-border">{testimonial.quote}</QuoteText>
          <QuoteAuthor className="quote-author">{testimonial.author}</QuoteAuthor>

          <DotsRow className="dots-row">
            {TESTIMONIALS.map((_, i) => (
              <Dot
                key={i}
                $active={i === active}
                aria-label={`View testimonial ${i + 1}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </DotsRow>
        </TestimonialsContentCol>

      </TestimonialsInner>
    </TestimonialsSectionEl>
  )
}
