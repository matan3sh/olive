'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Product, Review, ShippingSettings } from '@/lib/cms'
import { useCart } from '@/lib/cart'
import {
  ProductMain,
  ProductSplit,
  ProductImageBox,
  ProductInfo,
  ProductPageTitle,
  ProductPagePrice,
  ProductDivider,
  ProductDescription,
  AddToCartButton,
  ProductDetailsRow,
  DetailItem,
  DetailLabel,
  DetailValue,
} from './ProductDetail.styles'
import Breadcrumb from './Breadcrumb'
import SizeSelector from './SizeSelector'
import RelatedProducts from './RelatedProducts'
import ReviewsSection from './ReviewsSection'
import ShippingSection from './ShippingSection'

interface Props {
  product: Product
  allProducts: Product[]
  reviews: Review[]
  shippingSettings: ShippingSettings | null
}

function deriveMinPrice(variants: Product['variants']): string {
  if (!variants || variants.length === 0) return ''
  const prices = variants
    .map((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')))
    .filter((n) => !isNaN(n))
  if (prices.length === 0) return variants[0].price
  const min = Math.min(...prices)
  const match = variants.find((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')) === min)
  return match?.price ?? variants[0].price
}

export default function ProductDetail({ product, allProducts, reviews, shippingSettings }: Props) {
  const [selectedSize, setSelectedSize] = useState(0)
  const t = useTranslations('product')
  const fromLabel = t('from').toUpperCase()

  const { addItem, openCart } = useCart()

  function handleAddToCart() {
    const selectedVariant = product.variants[selectedSize] ?? product.variants[0]
    const numericPrice = parseFloat(selectedVariant.price.replace(/[^0-9.]/g, '')) || 0
    addItem({
      productId: product.id,
      title: product.title,
      image: product.image ?? null,
      size: selectedVariant.label,
      price: numericPrice,
    })
    openCart()
  }

  const relatedProducts = useMemo(
    () => allProducts.filter((p) => p.id !== product.id),
    [allProducts, product.id],
  )

  const displayPrice = useMemo(() => deriveMinPrice(product.variants), [product.variants])

  return (
    <ProductMain>
      <Breadcrumb
        home={t('breadcrumbHome')}
        shop={t('breadcrumbShop')}
        current={product.subtitle}
      />

      <ProductSplit>
        <ProductImageBox $objectFit={product.fit}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </ProductImageBox>

        <ProductInfo>
          <ProductPageTitle>{product.title}</ProductPageTitle>

          <ProductPagePrice>{fromLabel} {displayPrice}</ProductPagePrice>

          <ProductDivider />

          <SizeSelector
            variants={product.variants}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            label={t('size')}
            outOfStockLabel={t('outOfStock')}
            fewLeftLabel={t('fewLeft')}
          />

          <ProductDescription>{product.description}</ProductDescription>

          <AddToCartButton onClick={handleAddToCart}>{t('addToCart')}</AddToCartButton>

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

          {shippingSettings && (
            <>
              <ProductDivider />
              <ShippingSection
                settings={shippingSettings}
                labels={{
                  heading: t('shipping.heading'),
                  zone: t('shipping.zone'),
                  price: t('shipping.price'),
                  delivery: t('shipping.delivery'),
                  freeAbove: t('shipping.freeAbove'),
                }}
              />
            </>
          )}

          <ProductDivider />

          <ReviewsSection
            reviews={reviews}
            heading={t('reviews.heading')}
            noReviewsLabel={t('reviews.noReviews')}
          />
        </ProductInfo>
      </ProductSplit>

      <RelatedProducts
        products={relatedProducts}
        heading={t('youMayAlsoLike')}
        fromLabel={fromLabel}
      />
    </ProductMain>
  )
}
