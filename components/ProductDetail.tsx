'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
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
} from '@/app/[locale]/product/product.styles'

interface Props {
  product: Product
  allProducts: Product[]
}

export default function ProductDetail({ product, allProducts }: Props) {
  const [selectedSize, setSelectedSize] = useState(0)
  const t = useTranslations('product')
  const fromLabel = t('from').toUpperCase()

  const relatedProducts = useMemo(
    () => allProducts.filter((p) => p.id !== product.id),
    [allProducts, product.id],
  )

  return (
    <ProductMain>
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <BreadcrumbBar>
        <BreadcrumbNav>
          <BreadcrumbLink href="/">{t('breadcrumbHome')}</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbLink href="/shop">{t('breadcrumbShop')}</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbCurrent>{product.subtitle}</BreadcrumbCurrent>
        </BreadcrumbNav>
      </BreadcrumbBar>

      {/* ── Main split layout ───────────────────────────────────── */}
      <ProductSplit>

        {/* Left — product image */}
        <ProductImageBox>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: product.fit, padding: '40px' }}
            priority
          />
        </ProductImageBox>

        {/* Right — product info */}
        <ProductInfo>

          <ProductPageTitle>{product.title}</ProductPageTitle>

          <ProductPagePrice>{fromLabel} {product.price}</ProductPagePrice>

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

          <ProductDescription>{product.description}</ProductDescription>

          <AddToCartButton>{t('addToCart')}</AddToCartButton>

          <ProductDivider />

          <ProductDetailsRow>
            {[
              { label: t('origin'), value: product.origin },
              { label: t('harvest'), value: product.harvest },
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
            {relatedProducts.map((p) => (
              <RelatedCard key={p.id} href={`/product?id=${p.id}`}>
                <RelatedImageBox>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="25vw"
                    style={{ objectFit: p.fit, padding: '20px' }}
                  />
                </RelatedImageBox>
                <RelatedTitle>{p.title}</RelatedTitle>
                <RelatedPrice>{fromLabel} {p.price}</RelatedPrice>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </RelatedInner>
      </RelatedSection>
    </ProductMain>
  )
}
