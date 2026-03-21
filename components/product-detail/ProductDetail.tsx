'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
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

interface Props {
  product: Product
  allProducts: Product[]
}

export default function ProductDetail({ product, allProducts }: Props) {
  const [selectedSize, setSelectedSize] = useState(0)
  const t = useTranslations('product')
  const fromLabel = t('from').toUpperCase()

  const { addItem, openCart } = useCart()

  function handleAddToCart() {
    const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0
    addItem({
      productId: product.id,
      title: product.title,
      image: product.image ?? null,
      size: product.sizes[selectedSize] ?? product.sizes[0] ?? '',
      price: numericPrice,
    })
    openCart()
  }

  const relatedProducts = useMemo(
    () => allProducts.filter((p) => p.id !== product.id),
    [allProducts, product.id],
  )

  return (
    <ProductMain>
      <Breadcrumb
        home={t('breadcrumbHome')}
        shop={t('breadcrumbShop')}
        current={product.subtitle}
      />

      <ProductSplit>
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

        <ProductInfo>
          <ProductPageTitle>{product.title}</ProductPageTitle>

          <ProductPagePrice>{fromLabel} {product.price}</ProductPagePrice>

          <ProductDivider />

          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            label={t('size')}
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
