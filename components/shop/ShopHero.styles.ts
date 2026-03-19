import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.imageBg};
  width: 100%;
`

export const HeroInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 149px 60px;

  ${media.belowXl`
    padding: 70px 60px 50px;
  `}

  ${media.belowLg`
    padding: 60px 32px 40px;
  `}

  ${media.belowSm`
    padding: 48px 20px 32px;
  `}
`

export const Eyebrow = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.55;
  margin-bottom: 12px;
`

export const HeroHeading = styled.h1`
  font-size: clamp(2.5rem, 5vw, 64px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 12px;
`

export const ProductCount = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 24px;
`

export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
`

export const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textDark};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`

export const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`
