import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const ProductMain = styled.main`
  background-color: ${({ theme }) => theme.colors.white};
`

export const BreadcrumbBar = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 149px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionGreen};

  ${media.belowLg`
    padding: 24px 32px;
  `}

  ${media.belowSm`
    padding: 16px 20px;
  `}
`

export const BreadcrumbNav = styled.nav`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.6;
  display: flex;
  gap: 8px;
  align-items: center;
`

export const BreadcrumbLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export const BreadcrumbCurrent = styled.span`
  opacity: 1;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
`

export const ProductSplit = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 149px 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;

  ${media.belowXl`
    padding: 60px 60px 80px;
    gap: 60px;
  `}

  ${media.belowLg`
    grid-template-columns: 1fr;
    padding: 40px 32px 60px;
    gap: 40px;
  `}

  ${media.belowSm`
    padding: 32px 20px 48px;
  `}
`

export const ProductImageBox = styled.div`
  background-color: #f8f9f5;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1.2;
  position: relative;
  overflow: hidden;
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding-top: 12px;
`

export const ProductPageTitle = styled.h1`
  font-size: clamp(1.5rem, 2.5vw, 36px);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.3;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

export const ProductPagePrice = styled.p`
  font-size: 22px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.5px;
`

export const ProductDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.sectionGreen};
  margin: 0;
`

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
    $selected ? theme.colors.textDark : 'rgba(17,38,12,0.25)'};
  background-color: transparent;
  padding: 8px 20px;
  cursor: pointer;
  letter-spacing: 0.5px;
`

export const ProductDescription = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 26px;
  opacity: 0.85;
`

export const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
`

export const ProductDetailsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const DetailLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
`

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
`

export const RelatedSection = styled.div`
  background-color: ${({ theme }) => theme.colors.sectionGreen};
  padding: 60px 0;
`

export const RelatedInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 149px;

  ${media.belowXl`
    padding: 0 60px;
  `}

  ${media.belowLg`
    padding: 0 32px;
  `}

  ${media.belowSm`
    padding: 0 20px;
  `}
`

export const RelatedHeading = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 40px;
  letter-spacing: 0.5px;
`

export const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 21px;

  ${media.belowXl`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${media.belowLg`
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `}
`

export const RelatedCard = styled(Link)`
  text-decoration: none;
`

export const RelatedImageBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  aspect-ratio: 268/379;
  position: relative;
  overflow: hidden;
  margin-bottom: 14px;
`

export const RelatedTitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
  line-height: 20px;
  margin-bottom: 4px;
`

export const RelatedPrice = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.5px;
`
