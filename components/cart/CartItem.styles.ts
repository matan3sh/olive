import styled from 'styled-components'
import { media } from '@/styles/media'

export const ItemRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navBorder};
`

export const ItemImage = styled.div`
  width: 72px;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.imageBg};
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  padding: 8px;

  ${media.belowSm`
    width: 56px;
    height: 56px;
  `}
`

export const ItemDetails = styled.div`
  flex: 1;
  min-width: 0;
`

export const ItemName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.04em;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemSize = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 10px;
  letter-spacing: 0.06em;
`

export const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`

export const QtyControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
`

export const QtyBtn = styled.button`
  background: none;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textDark};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`

export const QtyValue = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
  min-width: 20px;
  text-align: center;
  padding: 0 4px;
`

export const ItemPrice = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.03em;
  white-space: nowrap;
`

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.08em;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.15s ease;
  display: block;
  margin-top: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.textDark};
  }
`
