'use client'

import Image from 'next/image'
import type { Product } from '@/lib/cms'
import {
  ProductCard,
  ProductImageLink,
  ProductImageWrapper,
  ProductIndex,
  ProductPrice,
  ProductTitle,
} from './ProductCard.styles'

interface Props {
  product: Product
  index: number
  fromLabel: string
}

export default function ProductCardComponent({ product, index, fromLabel }: Props) {
  return (
    <ProductCard className="product-card">
      <ProductImageLink href={`/product?id=${product.id}`}>
        <ProductImageWrapper $objectFit={product.fit}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 900px) 50vw, 268px"
          />
        </ProductImageWrapper>
      </ProductImageLink>
      <ProductIndex>— {String(index + 1).padStart(2, '0')}</ProductIndex>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>{fromLabel} {product.variants?.[0]?.price ?? ''}</ProductPrice>
    </ProductCard>
  )
}
