'use client'

import { useTranslations } from 'next-intl'
import {
  HeroSection,
  HeroInner,
  Eyebrow,
  HeroHeading,
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

  return (
    <HeroSection>
      <HeroInner>
        <Breadcrumb aria-label="Breadcrumb">
          <BreadcrumbLink href="/">{t('breadcrumbHome')}</BreadcrumbLink>
          <BreadcrumbSeparator aria-hidden="true">&rsaquo;</BreadcrumbSeparator>
          <BreadcrumbCurrent>{t('breadcrumbShop')}</BreadcrumbCurrent>
        </Breadcrumb>
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <HeroHeading>{t('title')}</HeroHeading>
        <ProductCount>{t('productCount', { count: filteredCount })}</ProductCount>
      </HeroInner>
    </HeroSection>
  )
}
