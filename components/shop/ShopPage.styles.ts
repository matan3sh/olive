import styled from 'styled-components'
import { media } from '@/styles/media'

export const ShopWrapper = styled.main`
  min-height: 100vh;
`

export const ProductsGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 149px 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(17, 38, 12, 0.15);
  border: 1px solid rgba(17, 38, 12, 0.15);

  ${media.belowXl`
    padding: 40px 60px 80px;
  `}

  ${media.belowLg`
    grid-template-columns: repeat(2, 1fr);
    padding: 32px 32px 60px;
  `}

  ${media.belowSm`
    padding: 24px 20px 48px;
  `}
`

export const EmptyState = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 149px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${media.belowXl`
    padding: 60px 60px;
  `}

  ${media.belowLg`
    padding: 48px 32px;
  `}

  ${media.belowSm`
    padding: 40px 20px;
  `}
`

export const EmptyTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 8px;
`

export const EmptySubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 24px;
`

export const ClearButton = styled.button`
  padding: 12px 28px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.textDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`
