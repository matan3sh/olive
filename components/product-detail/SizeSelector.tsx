'use client'

import { SizeButton, SizeButtonsRow, SizeLabel } from './SizeSelector.styles'

interface Props {
  sizes: string[]
  selectedSize: number
  onSelect: (i: number) => void
  label: string
}

export default function SizeSelector({ sizes, selectedSize, onSelect, label }: Props) {
  return (
    <div>
      <SizeLabel>{label}</SizeLabel>
      <SizeButtonsRow>
        {sizes.map((size, i) => (
          <SizeButton
            key={size}
            $selected={i === selectedSize}
            onClick={() => onSelect(i)}
          >
            {size}
          </SizeButton>
        ))}
      </SizeButtonsRow>
    </div>
  )
}
