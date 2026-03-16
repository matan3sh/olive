import Image from 'next/image'
import { PRODUCTS } from '@/lib/products'
import {
  ProductsSectionEl,
  ProductsOuter,
  ProductsHeadingRow,
  ProductsHeading,
  SeeAllLink,
  ProductsGrid,
  ProductCard,
  ProductImageLink,
  ProductImageWrapper,
  ProductTitle,
  ProductPrice,
} from './ProductsSection.styles'

export default function ProductsSection() {
  return (
    <ProductsSectionEl aria-label="Our olive oil products">
      <ProductsOuter>
        <ProductsHeadingRow>
          <ProductsHeading>Our Olive Oil</ProductsHeading>
          <SeeAllLink href="/shop">
            SEE ALL PRODUCTS
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M0 4h10M7 1l3 3-3 3" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SeeAllLink>
        </ProductsHeadingRow>

        <ProductsGrid>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id}>
              <ProductImageLink href={`/product?id=${p.id}`}>
                <ProductImageWrapper>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="268px"
                    style={{ objectFit: p.fit }}
                  />
                </ProductImageWrapper>
              </ProductImageLink>
              <ProductTitle>{p.title}</ProductTitle>
              <ProductPrice>FROM {p.price}</ProductPrice>
            </ProductCard>
          ))}
        </ProductsGrid>
      </ProductsOuter>
    </ProductsSectionEl>
  )
}
