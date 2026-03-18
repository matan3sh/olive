'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
import {
  ProductsSectionEl,
  ProductsOuter,
  ProductsHeadingRow,
  ProductsHeadingGroup,
  ProductsHeading,
  SeeAllLink,
  ProductsGrid,
  ProductCard,
  ProductIndex,
  ProductImageLink,
  ProductImageWrapper,
  ProductTitle,
  ProductPrice,
} from './ProductsSection.styles'

interface Props {
  products: Product[]
}

export default function ProductsSection({ products }: Props) {
  const containerRef = useRef<HTMLElement>(null)
  const t = useTranslations('products')

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })
      tl.from('.products-num', { opacity: 0, y: -10, duration: 0.6 }, 0)
      tl.from('.products-heading', { opacity: 0, duration: 0.5 }, 0.1)
      tl.from('.see-all', { opacity: 0, duration: 0.5 }, 0.2)
      tl.from('.product-card', { opacity: 0, y: 16, stagger: 0.1, duration: 0.6 }, 0.25)
    })

    mm.add('(max-width: 900px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.products-num', { opacity: 0, duration: 0.4, ease: 'power2.out' })
          gsap.from('.product-card', { opacity: 0, y: 10, stagger: 0.07, duration: 0.4, delay: 0.1, ease: 'power2.out' })
        },
      })
    })
  }, { scope: containerRef })

  return (
    <ProductsSectionEl ref={containerRef} aria-label="Our olive oil products">
      <ProductsOuter>
        <ProductsHeadingRow>
          <ProductsHeadingGroup>
            <ProductsHeading className="products-heading">{t('heading')}</ProductsHeading>
          </ProductsHeadingGroup>
          <SeeAllLink href="/shop" className="see-all">
            {t('seeAll')}
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M0 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SeeAllLink>
        </ProductsHeadingRow>

        <ProductsGrid>
          {products.map((p, i) => (
            <ProductCard key={p.id} className="product-card">
              <ProductImageLink href={`/product?id=${p.id}`}>
                <ProductImageWrapper>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 900px) 50vw, 268px"
                    style={{ objectFit: p.fit }}
                  />
                </ProductImageWrapper>
              </ProductImageLink>
              <ProductIndex>— {String(i + 1).padStart(2, '0')}</ProductIndex>
              <ProductTitle>{p.title}</ProductTitle>
              <ProductPrice>{t('from')} {p.price}</ProductPrice>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ProductsOuter>
    </ProductsSectionEl>
  )
}
