'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
import {
  FilterBarSection,
  FilterBarInner,
  FilterRow,
  PillGroup,
  Pill,
  DropdownWrapper,
  DropdownPanel,
  DropdownLabel,
  PriceInputRow,
  PriceInput,
  RightGroup,
  ResultsCount,
  SortSelect,
  ActiveFiltersRow,
  FilterChip,
} from './FilterBar.styles'

export interface FilterState {
  sizes: string[]
  acidity: string
  minPrice: string
  maxPrice: string
  featured: boolean
  sort: 'featured' | 'price_asc' | 'price_desc' | ''
}

interface FilterBarProps {
  products: Product[]
  filters: FilterState
  filteredCount: number
  onFilterChange: (filters: FilterState) => void
}

type DropdownType = 'size' | 'acidity' | 'price' | null

export default function FilterBar({
  products,
  filters,
  filteredCount,
  onFilterChange,
}: FilterBarProps) {
  const t = useTranslations('shop')
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const availableSizes = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)))
    return Array.from(set).sort()
  }, [products])

  const availableAcidities = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      if (p.acidity) set.add(p.acidity)
    })
    return Array.from(set).sort()
  }, [products])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [])

  const toggleDropdown = useCallback((type: DropdownType) => {
    setOpenDropdown((prev) => (prev === type ? null : type))
  }, [])

  const handleSizeToggle = useCallback(
    (size: string) => {
      const next = filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size]
      onFilterChange({ ...filters, sizes: next })
    },
    [filters, onFilterChange]
  )

  const handleAcidityChange = useCallback(
    (value: string) => {
      onFilterChange({ ...filters, acidity: value })
    },
    [filters, onFilterChange]
  )

  const handlePriceChange = useCallback(
    (field: 'minPrice' | 'maxPrice', value: string) => {
      onFilterChange({ ...filters, [field]: value })
    },
    [filters, onFilterChange]
  )

  const handleFeaturedToggle = useCallback(() => {
    onFilterChange({ ...filters, featured: !filters.featured })
  }, [filters, onFilterChange])

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onFilterChange({
        ...filters,
        sort: e.target.value as FilterState['sort'],
      })
    },
    [filters, onFilterChange]
  )

  const removeSize = useCallback(
    (size: string) => {
      onFilterChange({
        ...filters,
        sizes: filters.sizes.filter((s) => s !== size),
      })
    },
    [filters, onFilterChange]
  )

  const removeAcidity = useCallback(() => {
    onFilterChange({ ...filters, acidity: '' })
  }, [filters, onFilterChange])

  const removePrice = useCallback(
    (field: 'minPrice' | 'maxPrice') => {
      onFilterChange({ ...filters, [field]: '' })
    },
    [filters, onFilterChange]
  )

  const removeFeatured = useCallback(() => {
    onFilterChange({ ...filters, featured: false })
  }, [filters, onFilterChange])

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.acidity !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '' ||
    filters.featured

  return (
    <FilterBarSection ref={containerRef}>
      <FilterBarInner>
        <FilterRow>
          <PillGroup>
            {/* Size pill */}
            <DropdownWrapper>
              <Pill
                $active={filters.sizes.length > 0}
                onClick={() => toggleDropdown('size')}
              >
                {t('filters.size')}
                {filters.sizes.length > 0 && ` (${filters.sizes.length})`}
              </Pill>
              {openDropdown === 'size' && (
                <DropdownPanel>
                  {availableSizes.map((size) => (
                    <DropdownLabel key={size}>
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                      />
                      {size}
                    </DropdownLabel>
                  ))}
                </DropdownPanel>
              )}
            </DropdownWrapper>

            {/* Acidity pill */}
            <DropdownWrapper>
              <Pill
                $active={filters.acidity !== ''}
                onClick={() => toggleDropdown('acidity')}
              >
                {t('filters.acidity')}
              </Pill>
              {openDropdown === 'acidity' && (
                <DropdownPanel>
                  {availableAcidities.map((acid) => (
                    <DropdownLabel key={acid}>
                      <input
                        type="radio"
                        name="acidity"
                        checked={filters.acidity === acid}
                        onChange={() => handleAcidityChange(acid)}
                      />
                      {acid}
                    </DropdownLabel>
                  ))}
                </DropdownPanel>
              )}
            </DropdownWrapper>

            {/* Price pill */}
            <DropdownWrapper>
              <Pill
                $active={filters.minPrice !== '' || filters.maxPrice !== ''}
                onClick={() => toggleDropdown('price')}
              >
                {t('filters.price')}
              </Pill>
              {openDropdown === 'price' && (
                <DropdownPanel>
                  <PriceInputRow>
                    <PriceInput
                      type="text"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handlePriceChange('minPrice', e.target.value)
                      }
                    />
                    <span>&ndash;</span>
                    <PriceInput
                      type="text"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handlePriceChange('maxPrice', e.target.value)
                      }
                    />
                  </PriceInputRow>
                </DropdownPanel>
              )}
            </DropdownWrapper>

            {/* Featured pill (toggle, no dropdown) */}
            <Pill $active={filters.featured} onClick={handleFeaturedToggle}>
              {t('filters.featured')}
            </Pill>
          </PillGroup>

          <RightGroup>
            <ResultsCount>
              {t('filters.results', { count: filteredCount })}
            </ResultsCount>
            <SortSelect value={filters.sort} onChange={handleSortChange}>
              <option value="">{t('filters.sort')}</option>
              <option value="featured">{t('filters.sortFeatured')}</option>
              <option value="price_asc">{t('filters.sortPriceAsc')}</option>
              <option value="price_desc">{t('filters.sortPriceDesc')}</option>
            </SortSelect>
          </RightGroup>
        </FilterRow>

        {hasActiveFilters && (
          <ActiveFiltersRow>
            {filters.sizes.map((size) => (
              <FilterChip key={`size-${size}`} onClick={() => removeSize(size)}>
                {t('filters.size')}: {size} <span>&times;</span>
              </FilterChip>
            ))}
            {filters.acidity && (
              <FilterChip onClick={removeAcidity}>
                {t('filters.acidity')}: {filters.acidity} <span>&times;</span>
              </FilterChip>
            )}
            {filters.minPrice && (
              <FilterChip onClick={() => removePrice('minPrice')}>
                Min: ${filters.minPrice} <span>&times;</span>
              </FilterChip>
            )}
            {filters.maxPrice && (
              <FilterChip onClick={() => removePrice('maxPrice')}>
                Max: ${filters.maxPrice} <span>&times;</span>
              </FilterChip>
            )}
            {filters.featured && (
              <FilterChip onClick={removeFeatured}>
                {t('filters.featured')} <span>&times;</span>
              </FilterChip>
            )}
          </ActiveFiltersRow>
        )}
      </FilterBarInner>
    </FilterBarSection>
  )
}
