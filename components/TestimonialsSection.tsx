'use client'

/*
  Figma layout:
  - Section: white bg, height 363px, content max-width 753px centered
  - "Customer Feedbacks": 45px w400, lh=60px, color=#11260c, centered
  - Quote mark: 24×20px, color=#d1dcc3
  - Quote text: 18px w300 lh=32px color=#11260c opacity=0.80, centered
  - Author: 18px w400 lh=24px color=#11260c, centered
  - Dots: 8px circles, active=filled #1f231a, inactive=outlined #1f231a opacity=0.36, gap=8px
*/

import { useState } from 'react'
import {
  TestimonialsSectionEl,
  TestimonialsInner,
  TestimonialsHeading,
  QuoteMark,
  QuoteText,
  QuoteAuthor,
  DotsRow,
  Dot,
} from './TestimonialsSection.styles'

const TESTIMONIALS = [
  {
    quote: '"I was looking for pure extra virgin olive oil and I found it. I must say that it is by far the best quality extra virgin olive oil I have found at this price point."',
    author: '- Emma Anderson, Housewife',
  },
  {
    quote: '"The richness and depth of flavor in every bottle is unmatched. You can truly taste the difference of fresh-pressed, single-origin oil."',
    author: '- James Carter, Chef',
  },
  {
    quote: '"Finally an olive oil that lives up to its promises. Cold pressed, single origin, and absolutely delicious on everything."',
    author: '- Sofia Mendez, Food Blogger',
  },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]

  return (
    <TestimonialsSectionEl aria-label="Customer testimonials">
      <TestimonialsInner>
        <TestimonialsHeading>Customer Feedbacks</TestimonialsHeading>
        <QuoteMark aria-hidden="true">&#8220;</QuoteMark>
        <QuoteText key={active}>{t.quote}</QuoteText>
        <QuoteAuthor>{t.author}</QuoteAuthor>
        <DotsRow>
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
      </TestimonialsInner>
    </TestimonialsSectionEl>
  )
}
