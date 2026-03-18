import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'
import { hoverUnderline } from '@/styles/mixins'

export const ProductsSectionEl = styled.section`
  background-color: ${({ theme }) => theme.colors.sectionGreen};
  width: 100%;
`

export const ProductsOuter = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 149px;

  ${media.belowXl`
    padding: 80px 60px;
  `}

  ${media.belowLg`
    padding: 60px 32px;
  `}

  ${media.belowSm`
    padding: 48px 20px;
  `}
`

export const ProductsHeadingRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 48px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(17, 38, 12, 0.2);
`

export const ProductsHeadingGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
`

export const ProductsSectionNum = styled.span`
  font-size: clamp(2rem, 3.5vw, 42px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.04em;
  line-height: 1;
`

export const ProductsHeading = styled.h2`
  font-size: clamp(0.85rem, 1.1vw, 14px);
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.55;
  margin: 0;
  line-height: 1;
`

export const SeeAllLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textDark};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  ${hoverUnderline}
`

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 268px));
  gap: 1px;
  background: rgba(17, 38, 12, 0.15);
  border: 1px solid rgba(17, 38, 12, 0.15);

  ${media.belowXl`
    grid-template-columns: repeat(4, 1fr);
  `}

  ${media.belowLg`
    grid-template-columns: repeat(2, 1fr);
  `}
`
