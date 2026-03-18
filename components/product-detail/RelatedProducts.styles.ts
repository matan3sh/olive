import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

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
