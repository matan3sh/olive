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

interface ProductImageBoxProps {
  $objectFit?: 'cover' | 'contain'
}

export const ProductImageBox = styled.div<ProductImageBoxProps>`
  background-color: ${({ theme }) => theme.colors.imageBg};
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1.2;
  position: relative;
  overflow: hidden;

  img {
    object-fit: ${({ $objectFit }) => $objectFit ?? 'cover'};
    padding: 40px;
  }
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

export const ReviewsSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const AccordionSection = styled.div`
  padding-top: 24px;
`

export const AccordionHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: start;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.75;
  }
`

export const AccordionTitleGroup = styled.span`
  display: flex;
  align-items: baseline;
  gap: 8px;
`

export const AccordionTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
`

export const AccordionMeta = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.warningAmber};
  letter-spacing: 0.5px;
`

export const AccordionChevron = styled.span<{ $open: boolean }>`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.4;
  transition: transform 0.25s ease;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  display: inline-block;
`

export const AccordionBody = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '800px' : '0')};
  transition: max-height 0.35s ease;
`

export const VerificationToast = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $visible }) => ($visible ? '0' : '-120%')});
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 14px 28px;
  white-space: nowrap;
  z-index: 9999;
  transition: transform 0.4s ease;
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`
