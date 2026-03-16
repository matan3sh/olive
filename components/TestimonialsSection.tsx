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
    <section
      aria-label="Customer testimonials"
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        minHeight: '363px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
      }}
    >
      <div style={{ maxWidth: '753px', width: '100%', textAlign: 'center' }}>

        {/* Heading */}
        <h2 style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'clamp(1.75rem, 3.2vw, 45px)',
          fontWeight: 400,
          lineHeight: '60px',
          color: '#11260c',
          marginBottom: '20px',
        }}>
          Customer Feedbacks
        </h2>

        {/* Decorative quote mark — matches Figma 24×20px shape */}
        <div aria-hidden="true" style={{
          color: '#d1dcc3',
          fontSize: '60px',
          lineHeight: 1,
          height: '24px',
          overflow: 'visible',
          marginBottom: '24px',
          fontFamily: 'Georgia, serif',
          userSelect: 'none',
        }}>
          &#8220;
        </div>

        {/* Quote */}
        <blockquote key={active} style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '18px',
          fontWeight: 300,
          lineHeight: '32px',
          color: '#11260c',
          opacity: 0.80,
          marginBottom: '16px',
          fontStyle: 'normal',
        }}>
          {t.quote}
        </blockquote>

        {/* Author */}
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '24px',
          color: '#11260c',
          marginBottom: '28px',
        }}>
          {t.author}
        </p>

        {/* Dot slider */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`View testimonial ${i + 1}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: i === active ? '#1f231a' : 'transparent',
                border: '1px solid #1f231a',
                opacity: i === active ? 1 : 0.36,
                padding: 0,
                cursor: 'pointer',
                transition: 'opacity 0.2s, background-color 0.2s',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
