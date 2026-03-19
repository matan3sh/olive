'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import {
  HeroSection,
  HeroBg,
  HeroInner,
  Eyebrow,
  HeroHeading,
  HeroDivider,
  ProductCount,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
} from './ShopHero.styles'

interface Props {
  filteredCount: number
}

export default function ShopHero({ filteredCount }: Props) {
  const t = useTranslations('shop')
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.shop-hero-item', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    })
  }, { scope: containerRef })

  return (
    <HeroSection ref={containerRef}>
      <HeroBg />
      <HeroInner>
        <Breadcrumb aria-label="Breadcrumb" className="shop-hero-item">
          <BreadcrumbLink href="/">{t('breadcrumbHome')}</BreadcrumbLink>
          <BreadcrumbSeparator aria-hidden="true">&rsaquo;</BreadcrumbSeparator>
          <BreadcrumbCurrent>{t('breadcrumbShop')}</BreadcrumbCurrent>
        </Breadcrumb>
        <Eyebrow className="shop-hero-item">{t('eyebrow')}</Eyebrow>
        <HeroHeading className="shop-hero-item">{t('title')}</HeroHeading>
        <HeroDivider className="shop-hero-item" />
        <ProductCount className="shop-hero-item">
          {t('productCount', { count: filteredCount })}
        </ProductCount>
      </HeroInner>
    </HeroSection>
  )
}
