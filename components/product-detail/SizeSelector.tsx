'use client'

import type { ProductVariant } from '@/lib/cms'
import { SizeButton, SizeButtonsRow, SizeButtonWrapper, SizeLabel, StockTooltip } from './SizeSelector.styles'

interface Props {
  variants: ProductVariant[]
  selectedSize: number
  onSelect: (i: number) => void
  label: string
  outOfStockLabel: string
  fewLeftLabel: string
}

export default function SizeSelector({ variants, selectedSize, onSelect, label, outOfStockLabel, fewLeftLabel }: Props) {
  return (
    <div>
      <SizeLabel>{label}</SizeLabel>
      <SizeButtonsRow>
        {variants.map((variant, i) => (
          <SizeButtonWrapper key={variant.label}>
            <SizeButton
              $selected={i === selectedSize}
              $stock={variant.stock}
              onClick={() => variant.stock !== 'out_of_stock' && onSelect(i)}
              disabled={variant.stock === 'out_of_stock'}
            >
              {variant.label}
            </SizeButton>
            {variant.stock === 'out_of_stock' && <StockTooltip>{outOfStockLabel}</StockTooltip>}
            {variant.stock === 'few_left' && <StockTooltip>{fewLeftLabel}</StockTooltip>}
          </SizeButtonWrapper>
        ))}
      </SizeButtonsRow>
    </div>
  )
}
