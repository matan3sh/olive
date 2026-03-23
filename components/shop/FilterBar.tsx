'use client'

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import type { Product } from '@/lib/cms'
import { deriveMinPriceNumeric } from '@/lib/utils/price'
import {
  FilterBarSection,
  FilterBarInner,
  FilterRow,
  PillGroup,
  Pill,
  DropdownWrapper,
  DropdownPanel,
  PriceDropdownPanel,
  DropdownLabel,
  PriceSliderContainer,
  RangeTrack,
  RangeInput,
  PriceSliderLabels,
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
  sort: 'best' | 'price_asc' | 'price_desc' | ''
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
    products.forEach((p) => (p.variants?.map((v) => v.label) ?? []).forEach((s) => set.add(s)))
    return Array.from(set).sort()
  }, [products])

  const priceRange = useMemo(() => {
    const prices = products.map((p) => deriveMinPriceNumeric(p.variants))
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    }
  }, [products])

  const effectiveMin = priceRange.min
  const effectiveMax = priceRange.min === priceRange.max ? priceRange.max + 50 : priceRange.max

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
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

  const hasActiveMinPrice = filters.minPrice !== '' && parseFloat(filters.minPrice) !== effectiveMin
  const hasActiveMaxPrice = filters.maxPrice !== '' && parseFloat(filters.maxPrice) !== effectiveMax

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.acidity !== '' ||
    hasActiveMinPrice ||
    hasActiveMaxPrice ||
    filters.featured

  return (
    <FilterBarSection ref={containerRef}>
      <FilterBarInner>
        <FilterRow>
          <PillGroup>
            {/* Size pill */}
            <DropdownWrapper>
              <Pill
                type="button"
                $active={filters.sizes.length > 0}
                onClick={() => toggleDropdown('size')}
                aria-expanded={openDropdown === 'size'}
                aria-haspopup="listbox"
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
                type="button"
                $active={filters.acidity !== ''}
                onClick={() => toggleDropdown('acidity')}
                aria-expanded={openDropdown === 'acidity'}
                aria-haspopup="listbox"
              >
                {t('filters.acidity')}{filters.acidity ? ` (${filters.acidity})` : ''}
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
                type="button"
                $active={filters.minPrice !== '' || filters.maxPrice !== ''}
                onClick={() => toggleDropdown('price')}
                aria-expanded={openDropdown === 'price'}
              >
                {t('filters.price')}
              </Pill>
              {openDropdown === 'price' && (
                <PriceDropdownPanel>
                  <PriceSliderContainer>
                    <RangeTrack
                      $minPct={((parseFloat(filters.minPrice || String(effectiveMin)) - effectiveMin) / (effectiveMax - effectiveMin)) * 100}
                      $maxPct={((parseFloat(filters.maxPrice || String(effectiveMax)) - effectiveMin) / (effectiveMax - effectiveMin)) * 100}
                    >
                      <RangeInput
                        type="range"
                        min={effectiveMin}
                        max={effectiveMax}
                        step={1}
                        value={parseFloat(filters.minPrice || String(effectiveMin))}
                        onChange={(e) => {
                          const val = Math.min(Number(e.target.value), parseFloat(filters.maxPrice || String(effectiveMax)) - 1)
                          handlePriceChange('minPrice', String(val))
                        }}
                      />
                      <RangeInput
                        type="range"
                        min={effectiveMin}
                        max={effectiveMax}
                        step={1}
                        value={parseFloat(filters.maxPrice || String(effectiveMax))}
                        onChange={(e) => {
                          const val = Math.max(Number(e.target.value), parseFloat(filters.minPrice || String(effectiveMin)) + 1)
                          handlePriceChange('maxPrice', String(val))
                        }}
                      />
                    </RangeTrack>
                    <PriceSliderLabels>
                      <span>${Math.round(parseFloat(filters.minPrice || String(effectiveMin)))}</span>
                      <span>${Math.round(parseFloat(filters.maxPrice || String(effectiveMax)))}</span>
                    </PriceSliderLabels>
                  </PriceSliderContainer>
                </PriceDropdownPanel>
              )}
            </DropdownWrapper>

            {/* Featured pill (toggle, no dropdown) */}
            <Pill type="button" $active={filters.featured} onClick={handleFeaturedToggle}>
              {t('filters.featured')}
            </Pill>
          </PillGroup>

          <RightGroup>
            <ResultsCount>
              {t('filters.results', { count: filteredCount })}
            </ResultsCount>
            <SortSelect value={filters.sort} onChange={handleSortChange}>
              <option value="">{t('filters.sort')}</option>
              <option value="best">{t('filters.sortFeatured')}</option>
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
            {hasActiveMinPrice && (
              <FilterChip onClick={() => removePrice('minPrice')}>
                {t('filters.minLabel')}: ${filters.minPrice} <span>&times;</span>
              </FilterChip>
            )}
            {hasActiveMaxPrice && (
              <FilterChip onClick={() => removePrice('maxPrice')}>
                {t('filters.maxLabel')}: ${filters.maxPrice} <span>&times;</span>
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
