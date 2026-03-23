'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Product, Review, ShippingSettings } from '@/lib/cms'
import { useCart } from '@/lib/cart'
import { deriveMinPrice } from '@/lib/utils/price'
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
  ReviewsSectionWrapper,
  AccordionSection,
  AccordionHeader,
  AccordionTitleGroup,
  AccordionTitle,
  AccordionMeta,
  AccordionChevron,
  AccordionBody,
  VerificationToast,
} from './ProductDetail.styles'
import Breadcrumb from './Breadcrumb'
import SizeSelector from './SizeSelector'
import RelatedProducts from './RelatedProducts'
import ReviewsSection from './ReviewsSection'
import ShippingSection from './ShippingSection'
import ReviewForm from './ReviewForm'

interface Props {
  product: Product
  allProducts: Product[]
  reviews: Review[]
  shippingSettings: ShippingSettings | null
  showVerifiedBanner?: boolean
}


export default function ProductDetail({ product, allProducts, reviews, shippingSettings, showVerifiedBanner = false }: Props) {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'en'
  const router = useRouter()
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

  const hasReviews = reviews.length > 0
  const avgRating = useMemo(() => {
    if (!hasReviews) return 0
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }, [reviews, hasReviews])

  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(showVerifiedBanner)

  useEffect(() => {
    if (!showVerifiedBanner) return
    const hide = setTimeout(() => setToastVisible(false), 4000)
    // Clean ?verified=1 from the URL so refresh doesn't re-show it
    router.replace(`/${locale}/product?id=${product.id}`, { scroll: false })
    return () => clearTimeout(hide)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

          <ReviewsSectionWrapper>
            {hasReviews ? (
              <AccordionSection>
                <AccordionHeader type="button" onClick={() => setIsReviewsOpen((o) => !o)}>
                  <AccordionTitleGroup>
                    <AccordionTitle>{t('reviews.heading')}</AccordionTitle>
                    <AccordionMeta>★ {avgRating} ({reviews.length})</AccordionMeta>
                  </AccordionTitleGroup>
                  <AccordionChevron $open={isReviewsOpen}>▼</AccordionChevron>
                </AccordionHeader>
                <AccordionBody $open={isReviewsOpen}>
                  <ReviewsSection
                    reviews={reviews}
                    heading={t('reviews.heading')}
                    noReviewsLabel={t('reviews.noReviews')}
                    showHeading={false}
                  />
                </AccordionBody>
              </AccordionSection>
            ) : (
              <ReviewsSection
                reviews={reviews}
                heading={t('reviews.heading')}
                noReviewsLabel={t('reviews.noReviews')}
              />
            )}

            <AccordionSection>
              <AccordionHeader type="button" onClick={() => setIsFormOpen((o) => !o)}>
                <AccordionTitle>{t('review.formHeading')}</AccordionTitle>
                <AccordionChevron $open={isFormOpen}>▼</AccordionChevron>
              </AccordionHeader>
              <AccordionBody $open={isFormOpen}>
                <ReviewForm
                  productId={product.id}
                  locale={locale}
                  showHeading={false}
                  labels={{
                    heading: t('review.formHeading'),
                    namePlaceholder: t('review.namePlaceholder'),
                    emailPlaceholder: t('review.emailPlaceholder'),
                    textPlaceholder: t('review.textPlaceholder'),
                    starLabel: (n: number) => t('review.starLabel', { n }),
                    submit: t('review.submit'),
                    submitting: t('review.submitting'),
                    success: t('review.success'),
                    errorGeneric: t('review.errorGeneric'),
                    errorDuplicate: t('review.errorDuplicate'),
                    errorRateLimit: t('review.errorRateLimit'),
                  }}
                />
              </AccordionBody>
            </AccordionSection>
          </ReviewsSectionWrapper>
        </ProductInfo>
      </ProductSplit>

      <RelatedProducts
        products={relatedProducts}
        heading={t('youMayAlsoLike')}
        fromLabel={fromLabel}
      />

      <VerificationToast $visible={toastVisible}>
        {t('review.verifiedSuccess')}
      </VerificationToast>
    </ProductMain>
  )
}
