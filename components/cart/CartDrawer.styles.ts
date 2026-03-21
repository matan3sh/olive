import styled from 'styled-components'
import Link from 'next/link'
import { darkButtonBase } from '@/styles/mixins'

export const DrawerInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const AddedBanner = styled.div<{ $visible: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background-color: ${({ theme }) => theme.colors.sectionGreen};
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  max-height: ${({ $visible }) => ($visible ? '44px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
`

export const BannerDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.textDark};
  border-radius: 50%;
  flex-shrink: 0;
`

export const ItemsList = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`

export const EmptyIcon = styled.div`
  width: 52px;
  height: 52px;
  border: 1.5px solid ${({ theme }) => theme.colors.sectionBorder};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.sectionBorder};
  font-size: 22px;
`

export const EmptyTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.04em;
  margin: 0 0 6px;
`

export const EmptySubtitle = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
  margin: 0 0 24px;
`

export const ShopNowBtn = styled(Link)`
  ${darkButtonBase}
  padding: 10px 28px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-decoration: none;
`
