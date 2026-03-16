import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 79px;
`

export const ProductsHeading = styled.h2`
  font-size: clamp(1.75rem, 3.2vw, 45px);
  font-weight: 400;
  line-height: 60px;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0;
`

export const SeeAllLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textDark};
  text-decoration: none;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
`

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 268px));
  gap: 21px;

  ${media.belowXl`
    grid-template-columns: repeat(4, 1fr);
  `}

  ${media.belowLg`
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  `}

  ${media.belowSm`
    gap: 12px;
  `}
`

export const ProductCard = styled.article`
  display: flex;
  flex-direction: column;
`

export const ProductImageLink = styled(Link)`
  display: block;
  line-height: 0;
  margin-bottom: 20px;
`

export const ProductImageWrapper = styled.div`
  width: 268px;
  height: 379px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;

  ${media.belowXl`
    width: 100%;
    height: auto;
    aspect-ratio: 268/379;
  `}
`

export const ProductTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
  margin-bottom: 0;
`

export const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 26px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.textDark};
`
