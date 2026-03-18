import styled from 'styled-components'
import Link from 'next/link'

export const ProductCard = styled.article`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.sectionGreen};
  padding: 16px;
`

export const ProductIndex = styled.span`
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.25;
  margin-bottom: 10px;
  display: block;
`

export const ProductImageLink = styled(Link)`
  display: block;
  line-height: 0;
  margin-bottom: 12px;
`

export const ProductImageWrapper = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 268/379;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;
`

export const ProductTitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
  margin-bottom: 4px;
`

export const ProductPrice = styled.p`
  font-size: 11px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.6;
`
