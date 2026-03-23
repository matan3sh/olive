'use client'

import Image from 'next/image'
import type { Product } from '@/lib/cms'
import { deriveMinPrice } from '@/lib/utils/price'
import {
  RelatedCard,
  RelatedGrid,
  RelatedHeading,
  RelatedImageBox,
  RelatedInner,
  RelatedPrice,
  RelatedSection,
  RelatedTitle,
} from './RelatedProducts.styles'

interface Props {
  products: Product[]
  heading: string
  fromLabel: string
}

export default function RelatedProducts({ products, heading, fromLabel }: Props) {
  return (
    <RelatedSection>
      <RelatedInner>
        <RelatedHeading>{heading}</RelatedHeading>
        <RelatedGrid>
          {products.map((p) => (
            <RelatedCard key={p.id} href={`/product?id=${p.id}`}>
              <RelatedImageBox $objectFit={p.fit}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="25vw"
                />
              </RelatedImageBox>
              <RelatedTitle>{p.title}</RelatedTitle>
              <RelatedPrice>{fromLabel} {deriveMinPrice(p.variants)}</RelatedPrice>
            </RelatedCard>
          ))}
        </RelatedGrid>
      </RelatedInner>
    </RelatedSection>
  )
}
