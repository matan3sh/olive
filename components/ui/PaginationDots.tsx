'use client'

import { Dot, DotsRow } from './PaginationDots.styles'

interface Props {
  count: number
  active: number
  onSelect: (i: number) => void
}

export default function PaginationDots({ count, active, onSelect }: Props) {
  return (
    <DotsRow className="dots-row">
      {Array.from({ length: count }, (_, i) => (
        <Dot
          key={i}
          $active={i === active}
          aria-label={`View testimonial ${i + 1}`}
          aria-pressed={i === active}
          onClick={() => onSelect(i)}
        />
      ))}
    </DotsRow>
  )
}
