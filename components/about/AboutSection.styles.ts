import styled from 'styled-components'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export const AboutSectionEl = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  overflow: hidden;
`

export const DesktopLayout = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
  display: block;

  ${media.belowLg`
    display: none;
  `}

  @media (min-width: calc(${theme.breakpoints.lg} + 1px)) and (max-width: 1200px) {
    height: auto;
    min-height: 600px;
  }
`

interface AboutImageWrapperProps {
  $left?: string
  $top?: string | number
  $width?: string
  $height?: string
}

export const AboutImageWrapper = styled.div<AboutImageWrapperProps>`
  position: absolute;
  left: ${({ $left }) => $left ?? 'auto'};
  top: ${({ $top }) => (typeof $top === 'number' ? `${$top}px` : ($top ?? 'auto'))};
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  overflow: visible;
`

export const AboutTextBlock = styled.div`
  position: absolute;
  left: 33.2%;
  top: 100px;
  width: 33.6%;
  text-align: center;
`

export const MobileLayout = styled.div`
  display: none;
  flex-direction: column;

  ${media.belowLg`
    display: flex;
  `}
`

export const MobileTextBlock = styled.div`
  padding: 40px 24px;
`

export const MobileImageWrapper = styled.div<{ $ratio: string }>`
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  position: relative;
  overflow: hidden;
`

export const AboutSectionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const AboutTagNum = styled.span`
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.sectionGreen};
  background: ${({ theme }) => theme.colors.textDark};
  padding: 2px 8px;
`

export const AboutTagLabel = styled.span`
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.5;
`

export const AboutHeading = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 48px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin-bottom: 16px;
`

export const AboutRule = styled.div`
  width: 32px;
  height: 3px;
  background: ${({ theme }) => theme.colors.textDark};
  margin: 0 auto 20px auto;
  transform-origin: left center;
`

export const AboutBody = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: 0;
`
