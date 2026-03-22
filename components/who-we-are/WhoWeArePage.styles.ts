import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'
import { darkButtonBase } from '@/styles/mixins'

export const PageWrapper = styled.div`
  width: 100%;
`

export const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.textDark};
  padding: 80px 32px;
  text-align: center;

  ${media.belowMd`
    padding: 60px 24px;
  `}
`

export const HeroEyebrow = styled.div`
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.45;
  margin-bottom: 20px;
`

export const HeroQuote = styled.h1`
  font-size: clamp(1.8rem, 4vw, 52px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.sectionGreen};
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-transform: uppercase;
  max-width: 600px;
  margin: 0 auto 24px;
`

export const HeroRule = styled.div`
  width: 24px;
  height: 2px;
  background: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.4;
  margin: 0 auto 24px;
  transform-origin: center;
`

export const HeroSubtitle = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.sectionGreen};
  opacity: 0.6;
  line-height: 1.75;
  max-width: 440px;
  margin: 0 auto;
`

export const StatsBar = styled.div`
  background-color: ${({ theme }) => theme.colors.textDark};
  padding: 40px 32px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 24px;

  ${media.belowMd`
    padding: 32px 24px;
    gap: 20px;
  `}
`

export const StatCell = styled.div<{ $dark?: boolean }>`
  text-align: center;
  background: ${({ $dark, theme }) => ($dark ? theme.colors.white : 'transparent')};
  padding: ${({ $dark }) => ($dark ? '12px 20px' : '0')};
`

export const StatNum = styled.div<{ $dark?: boolean }>`
  font-size: clamp(1.4rem, 2.5vw, 32px);
  font-weight: 900;
  color: ${({ $dark, theme }) => ($dark ? theme.colors.textDark : theme.colors.sectionGreen)};
  letter-spacing: -0.02em;
`

export const StatLabel = styled.div<{ $dark?: boolean }>`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ $dark, theme }) => ($dark ? theme.colors.textDark : theme.colors.sectionGreen)};
  opacity: 0.45;
  margin-top: 4px;
`

export const CtaSection = styled.section`
  background-color: ${({ theme }) => theme.colors.sectionGreen};
  padding: 72px 24px;
  text-align: center;

  ${media.belowMd`
    padding: 52px 24px;
  `}
`

export const CtaEyebrow = styled.div`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.45;
  margin-bottom: 12px;
`

export const CtaHeading = styled.h2`
  font-size: clamp(1.6rem, 3vw, 42px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 24px;
`

export const CtaButton = styled(Link)`
  ${darkButtonBase}
  min-width: 180px;
  height: 50px;
  font-size: 10px;
`
