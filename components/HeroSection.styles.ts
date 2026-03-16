import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const HeroSectionEl = styled.section`
  position: relative;
  width: 100%;
  /* Desktop: row1Height (72px) + divider (1px) + row2Height (68px) = 141px */
  height: calc(100vh - calc(${({ theme }) => theme.header.row1Height} + ${({ theme }) => theme.header.divider} + ${({ theme }) => theme.header.row2Height}));
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  ${media.belowMd`
    height: calc(100vh - ${({ theme }) => theme.header.mobileHeight});
  `}
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(233, 238, 226, 0.80) 0%,
    rgba(233, 238, 226, 0.55) 50%,
    rgba(207, 211, 197, 0.20) 100%
  );
  z-index: 1;
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem 1.5rem;
  max-width: 900px;
  width: 100%;
`

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 4.5vw, 65px);
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.23;
  letter-spacing: 0;
  margin-bottom: 20px;
`

export const HeroSubtitle = styled.p`
  font-size: 24px;
  font-weight: 300;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSubtitle};
  line-height: 32px;
  letter-spacing: 3px;
  opacity: 0.60;
  margin-bottom: 44px;
`

export const HeroCtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 66px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 0;
`
