'use client'

import { useMemo, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
import { deriveMinPriceNumeric } from '@/lib/utils/price'
import ProductCard from '@/components/products/ProductCard'
import ShopHero from './ShopHero'
import FilterBar, { type FilterState } from './FilterBar'
import {
  ShopWrapper,
  ProductsGridOuter,
  ProductsGrid,
  EmptyState,
  EmptyTitle,
  EmptySubtitle,
  ClearButton,
} from './ShopPage.styles'

interface Props {
  products: Product[]
}

function parsePrice(price: string): number {
  const cleaned = price.replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

export default function ShopPage({ products }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('shop')
  const tProducts = useTranslations('products')

  const filterState: FilterState = useMemo(() => {
    const sizeParam = searchParams.get('size')
    const sizes = sizeParam ? sizeParam.split(',').filter(Boolean) : []
    const acidity = searchParams.get('acidity') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const featured = searchParams.get('featured') === 'true'
    const sort = (searchParams.get('sort') || '') as FilterState['sort']

    return { sizes, acidity, minPrice, maxPrice, featured, sort }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Size filter
      if (
        filterState.sizes.length > 0 &&
        !(product.variants?.map((v) => v.label) ?? []).some((s) => filterState.sizes.includes(s))
      ) {
        return false
      }

      // Acidity filter
      if (
        filterState.acidity &&
        product.acidity !== filterState.acidity
      ) {
        return false
      }

      // Price filter
      const price = deriveMinPriceNumeric(product.variants)
      if (filterState.minPrice && price < parseFloat(filterState.minPrice)) {
        return false
      }
      if (filterState.maxPrice && price > parseFloat(filterState.maxPrice)) {
        return false
      }

      // Featured filter
      if (filterState.featured && !product.featured) {
        return false
      }

      return true
    })

    // Sort
    if (filterState.sort === 'best') {
      result = [...result].sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.title.localeCompare(b.title)
      })
    } else if (filterState.sort === 'price_asc') {
      result = [...result].sort((a, b) => {
        const diff = deriveMinPriceNumeric(a.variants) - deriveMinPriceNumeric(b.variants)
        return diff !== 0 ? diff : a.title.localeCompare(b.title)
      })
    } else if (filterState.sort === 'price_desc') {
      result = [...result].sort((a, b) => {
        const diff = deriveMinPriceNumeric(b.variants) - deriveMinPriceNumeric(a.variants)
        return diff !== 0 ? diff : b.title.localeCompare(a.title)
      })
    }

    return result
  }, [products, filterState])

  const onFilterChange = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams()

      if (newFilters.sizes.length > 0) {
        params.set('size', newFilters.sizes.join(','))
      }
      if (newFilters.acidity) {
        params.set('acidity', newFilters.acidity)
      }
      if (newFilters.minPrice) {
        params.set('minPrice', newFilters.minPrice)
      }
      if (newFilters.maxPrice) {
        params.set('maxPrice', newFilters.maxPrice)
      }
      if (newFilters.featured) {
        params.set('featured', 'true')
      }
      if (newFilters.sort) {
        params.set('sort', newFilters.sort)
      }

      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname]
  )

  const clearAllFilters = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  return (
    <ShopWrapper>
      <ShopHero filteredCount={filteredProducts.length} />
      <FilterBar
        products={products}
        filters={filterState}
        filteredCount={filteredProducts.length}
        onFilterChange={onFilterChange}
      />

      {filteredProducts.length > 0 ? (
        <ProductsGridOuter>
          <ProductsGrid>
            {filteredProducts.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                index={i}
                fromLabel={tProducts('from')}
              />
            ))}
          </ProductsGrid>
        </ProductsGridOuter>
      ) : (
        <EmptyState>
          <EmptyTitle>{t('emptyState.title')}</EmptyTitle>
          <EmptySubtitle>{t('emptyState.subtitle')}</EmptySubtitle>
          <ClearButton onClick={clearAllFilters}>
            {t('filters.clearAll')}
          </ClearButton>
        </EmptyState>
      )}
    </ShopWrapper>
  )
}
