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
}

export const SizeButton = styled.button<SizeButtonProps>`
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 600 : 300)};
  color: ${({ theme }) => theme.colors.textDark};
  border-width: ${({ $selected }) => ($selected ? '1.5px' : '1px')};
  border-style: solid;
  border-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.textDark : theme.colors.borderMuted};
  background-color: transparent;
  padding: 8px 20px;
  cursor: pointer;
  letter-spacing: 0.5px;
`
