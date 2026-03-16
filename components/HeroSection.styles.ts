import styled from 'styled-components'
import Link from 'next/link'
import { theme as themeTokens } from '@/styles/theme'
import { media } from '@/styles/media'

export const HeroSectionEl = styled.section`
  position: relative;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.header.row1Height} - ${({ theme }) => theme.header.divider} - ${({ theme }) => theme.header.row2Height});
  background-color: ${({ theme }) => theme.colors.textDark};
  overflow: hidden;

  @media (max-width: ${themeTokens.breakpoints.md}) {
    height: calc(100vh - ${({ theme }) => theme.header.mobileHeight});
  }
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(233, 238, 226, 0.65) 0%,
    rgba(233, 238, 226, 0.35) 50%,
    rgba(207, 211, 197, 0.10) 100%
  );
  z-index: 1;
`

/* Swiss grid: dark left column + right content */
export const HeroGrid = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 200px 1fr;

  ${media.belowLg`
    grid-template-columns: 1fr;
  `}
`

export const HeroLeft = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.textDark};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 28px 22px;
  border-right: 2px solid rgba(233, 238, 226, 0.12);
  overflow: hidden;

  ${media.belowLg`
    display: none;
  `}
`

export const HeroVideoEl = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`

export const HeroVideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(10, 18, 8, 0.45);
  z-index: 1;
`

export const HeroSoundToggle = styled.button`
  position: absolute;
  top: 18px;
  right: 14px;
  z-index: 3;
  width: 26px;
  height: 26px;
  background: transparent;
  border: 1px solid rgba(233, 238, 226, 0.25);
  color: rgba(233, 238, 226, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(233, 238, 226, 0.6);
    color: rgba(233, 238, 226, 0.9);
  }
`

export const HeroIssueTag = styled.span`
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(233, 238, 226, 0.45);
  display: block;
  margin-bottom: 8px;
  position: relative;
  z-index: 2;
`

export const HeroNumber = styled.span`
  display: block;
  font-size: 100px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.sectionGreen};
  line-height: 0.9;
  letter-spacing: -0.05em;
  margin-bottom: 16px;
  position: relative;
  z-index: 2;
`

export const HeroSideLabel = styled.span`
  display: block;
  font-size: 8px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(233, 238, 226, 0.45);
  padding-top: 12px;
  border-top: 1px solid rgba(233, 238, 226, 0.12);
  position: relative;
  z-index: 2;
`

export const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px 48px;

  ${media.belowLg`
    padding: 36px 32px;
    justify-content: flex-end;
    gap: 24px;
  `}

  ${media.belowSm`
    padding: 28px 20px;
  `}
`

export const HeroEyebrow = styled.div`
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.7;

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 48px;
    background: currentColor;
  }
`

export const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 5.5vw, 72px);
  font-weight: 900;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin: 0;

  ${media.belowLg`
    font-size: clamp(2.2rem, 7vw, 54px);
  `}
`

export const HeroSubRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;

  ${media.belowSm`
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `}
`

export const HeroThinText = styled.p`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 300;
  opacity: 0.6;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 1px;
    background: ${({ theme }) => theme.colors.textDark};
  }
`

export const HeroCtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  height: 52px;
  background-color: ${({ theme }) => theme.colors.btnDark};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 0;
  white-space: nowrap;

  ${media.belowSm`
    width: 100%;
  `}
`

/* Mobile-only badge shown when left column is hidden */
export const HeroMobileBadge = styled.div`
  display: none;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;

  ${media.belowLg`
    display: flex;
  `}
`

export const HeroMobileNum = styled.span`
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textDark};
  background: ${({ theme }) => theme.colors.sectionGreen};
  padding: 3px 10px;
`

export const HeroMobileTag = styled.span`
  font-size: 8px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.5;
`
