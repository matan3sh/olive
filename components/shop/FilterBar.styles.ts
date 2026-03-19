import styled from 'styled-components'
import { media } from '@/styles/media'

export const FilterBarSection = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
`

export const FilterBarInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 149px;

  ${media.belowXl`
    padding: 16px 60px;
  `}

  ${media.belowLg`
    padding: 16px 32px;
  `}

  ${media.belowSm`
    padding: 12px 20px;
  `}
`

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`

export const PillGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const Pill = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.textDark : theme.colors.sectionBorder};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.textDark : 'transparent'};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.textDark};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const DropdownWrapper = styled.div`
  position: relative;
`

export const DropdownPanel = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-start: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  border-radius: 8px;
  padding: 16px;
  min-width: 200px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 20;
`

export const DropdownLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDark};
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const PriceInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const PriceInput = styled.input`
  width: 80px;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  border-radius: 6px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDark};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const PriceSliderContainer = styled.div`
  padding: 8px 4px 4px;
`

export const PriceSliderTrack = styled.div`
  position: relative;
  height: 4px;
  border-radius: 2px;
  margin: 16px 0;

  input[type='range'] {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%);
    pointer-events: none;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    height: 4px;
    outline: none;

    &::-webkit-slider-thumb {
      pointer-events: auto;
      appearance: none;
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #11260c;
      border: 2px solid #ffffff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      cursor: pointer;
    }

    &::-moz-range-thumb {
      pointer-events: auto;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #11260c;
      border: 2px solid #ffffff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      cursor: pointer;
    }
  }
`

export const RangeInput = styled.input``

export const PriceSliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #11260c;
  font-weight: 500;
  margin-top: 8px;
`

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-inline-start: auto;
`

export const ResultsCount = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap;
`

export const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  border-radius: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const ActiveFiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
`

export const FilterChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  background: ${({ theme }) => theme.colors.sectionGreen};
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.quoteGreen};
  }

  span {
    font-size: 14px;
    line-height: 1;
  }
`
