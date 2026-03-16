'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PRODUCTS } from '@/lib/products'
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

  return (
    <ProductMain>
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <BreadcrumbBar>
        <BreadcrumbNav>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
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

          <ProductPagePrice>FROM {product.price}</ProductPagePrice>

          <ProductDivider />

          <div>
            <SizeLabel>Size</SizeLabel>
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

          <AddToCartButton>Add to Cart</AddToCartButton>

          <ProductDivider />

          <ProductDetailsRow>
            {[
              { label: 'Origin', value: product.origin },
              { label: 'Harvest', value: product.harvest },
              { label: 'Acidity', value: product.acidity },
              { label: 'Processing', value: 'Cold pressed' },
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
          <RelatedHeading>You may also like</RelatedHeading>
          <RelatedGrid>
            {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
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
                <RelatedPrice>FROM {p.price}</RelatedPrice>
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
