'use client'

import Image from 'next/image'
import type { Product } from '@/lib/cms'
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
  )
}
