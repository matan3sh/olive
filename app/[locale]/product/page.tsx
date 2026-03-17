'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PRODUCTS } from '@/lib/products'
import { useTranslations } from 'next-intl'
import {
  ProductMain,
  BreadcrumbBar,
  BreadcrumbNav,
  BreadcrumbLink,
  BreadcrumbCurrent,
  ProductSplit,
  ProductImageBox,
  ProductInfo,
  ProductPageTitle,
  ProductPagePrice,
  ProductDivider,
  SizeLabel,
  SizeButtonsRow,
  SizeButton,
  ProductDescription,
  AddToCartButton,
  ProductDetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
  RelatedSection,
  RelatedInner,
  RelatedHeading,
  RelatedGrid,
  RelatedCard,
  RelatedImageBox,
  RelatedTitle,
  RelatedPrice,
} from './product.styles'

function ProductDetail() {
  const params = useSearchParams()
  const id = params.get('id') ?? 'robust'
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]
  const [selectedSize, setSelectedSize] = useState(0)
  const t = useTranslations('product')
  const tItems = useTranslations('productItems')

  const title = tItems(`${product.id}.title`)
  const subtitle = tItems(`${product.id}.subtitle`)
  const description = tItems(`${product.id}.description`)
  const origin = tItems(`${product.id}.origin`)
  const harvest = tItems(`${product.id}.harvest`)

  return (
    <ProductMain>
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <BreadcrumbBar>
        <BreadcrumbNav>
          <BreadcrumbLink href="/">{t('breadcrumbHome')}</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbLink href="/shop">{t('breadcrumbShop')}</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbCurrent>{subtitle}</BreadcrumbCurrent>
        </BreadcrumbNav>
      </BreadcrumbBar>

      {/* ── Main split layout ───────────────────────────────────── */}
      <ProductSplit>

        {/* Left — product image */}
        <ProductImageBox>
          <Image
            src={product.image}
            alt={title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: product.fit, padding: '40px' }}
            priority
          />
        </ProductImageBox>

        {/* Right — product info */}
        <ProductInfo>

          <ProductPageTitle>{title}</ProductPageTitle>

          <ProductPagePrice>{t('from').toUpperCase()} {product.price}</ProductPagePrice>

          <ProductDivider />

          <div>
            <SizeLabel>{t('size')}</SizeLabel>
            <SizeButtonsRow>
              {product.sizes.map((size, i) => (
                <SizeButton
                  key={size}
                  $selected={i === selectedSize}
                  onClick={() => setSelectedSize(i)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizeButtonsRow>
          </div>

          <ProductDescription>{description}</ProductDescription>

          <AddToCartButton>{t('addToCart')}</AddToCartButton>

          <ProductDivider />

          <ProductDetailsRow>
            {[
              { label: t('origin'), value: origin },
              { label: t('harvest'), value: harvest },
              { label: t('acidity'), value: product.acidity },
              { label: t('processing'), value: t('coldPressed') },
            ].map(({ label, value }) => (
              <DetailItem key={label}>
                <DetailLabel>{label}</DetailLabel>
                <DetailValue>{value}</DetailValue>
              </DetailItem>
            ))}
          </ProductDetailsRow>
        </ProductInfo>
      </ProductSplit>

      {/* ── Other products ──────────────────────────────────────── */}
      <RelatedSection>
        <RelatedInner>
          <RelatedHeading>{t('youMayAlsoLike')}</RelatedHeading>
          <RelatedGrid>
            {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
              <RelatedCard key={p.id} href={`/product?id=${p.id}`}>
                <RelatedImageBox>
                  <Image
                    src={p.image}
                    alt={tItems(`${p.id}.title`)}
                    fill
                    sizes="25vw"
                    style={{ objectFit: p.fit, padding: '20px' }}
                  />
                </RelatedImageBox>
                <RelatedTitle>{tItems(`${p.id}.title`)}</RelatedTitle>
                <RelatedPrice>{t('from').toUpperCase()} {p.price}</RelatedPrice>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedInner>
      </RelatedSection>
    </ProductMain>
  )
}

export default function ProductPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <ProductDetail />
      </Suspense>
      <Footer />
    </>
  )
}
