import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.textDark};
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
`

export const HeroInner = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  padding: 72px 149px 56px;
  display: flex;
  flex-direction: column;
  gap: 0;

  ${media.belowXl`
    padding: 64px 60px 48px;
  `}

  ${media.belowLg`
    padding: 48px 32px 36px;
  `}

  ${media.belowSm`
    padding: 40px 20px 28px;
  `}
`

export const Eyebrow = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 16px;
`

export const HeroHeading = styled.h1`
  font-size: clamp(3rem, 7vw, 88px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin: 0 0 20px;
`

export const HeroDivider = styled.div`
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
  margin-bottom: 20px;
`

export const ProductCount = styled.p`
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 28px;
  letter-spacing: 0.02em;
`

export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  order: -1;
  margin-bottom: 16px;
`

export const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }
`

export const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.25);
`

export const BreadcrumbCurrent = styled.span`
  color: rgba(255, 255, 255, 0.35);
`
