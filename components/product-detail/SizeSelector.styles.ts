import styled from 'styled-components'

export const SizeLabel = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
`

export const SizeButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

interface SizeButtonProps {
  $selected: boolean
  $stock: 'in_stock' | 'few_left' | 'out_of_stock'
}

export const SizeButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`

export const SizeButton = styled.button<SizeButtonProps>`
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 600 : 300)};
  color: ${({ $stock, theme }) =>
    $stock === 'out_of_stock' ? theme.colors.muted : theme.colors.textDark};
  border-width: ${({ $selected }) => ($selected ? '1.5px' : '1px')};
  border-style: ${({ $stock }) => ($stock === 'few_left' ? 'dashed' : 'solid')};
  border-color: ${({ $selected, $stock, theme }) => {
    if ($stock === 'out_of_stock') return theme.colors.muted
    if ($stock === 'few_left') return theme.colors.warningAmber
    return $selected ? theme.colors.textDark : theme.colors.borderMuted
  }};
  background-color: transparent;
  padding: 8px 20px;
  cursor: ${({ $stock }) => ($stock === 'out_of_stock' ? 'not-allowed' : 'pointer')};
  letter-spacing: 0.5px;
  opacity: ${({ $stock }) => ($stock === 'out_of_stock' ? 0.45 : 1)};
`

export const StockTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.textDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;

  ${SizeButtonWrapper}:hover & {
    opacity: 1;
  }
`
