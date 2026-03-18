import styled from 'styled-components'
import { media } from '@/styles/media'
import { darkButtonBase } from '@/styles/mixins'

export const ProductMain = styled.main`
  background-color: ${({ theme }) => theme.colors.white};
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
  background-color: ${({ theme }) => theme.colors.imageBg};
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

export const ProductDescription = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 26px;
  opacity: 0.85;
`

export const AddToCartButton = styled.button`
  ${darkButtonBase}
  width: 100%;
  height: 56px;
  font-size: 14px;
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
