import styled from 'styled-components'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

export const AboutSectionEl = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  overflow: hidden;
`

/* Desktop layout — hidden at belowLg (900px), shown above */
export const DesktopLayout = styled.div`
  position: relative;
  width: 100%;
  height: 629px;
  display: block;

  ${media.belowLg`
    display: none;
  `}

  /* Slightly responsive between lg breakpoint (900px) and 1200px */
  @media (min-width: calc(${theme.breakpoints.lg} + 1px)) and (max-width: 1200px) {
    height: auto;
    min-height: 440px;
  }
`

/* Mobile layout — shown at belowLg (900px), hidden above */
export const MobileLayout = styled.div`
  display: none;
  flex-direction: column;
  gap: 24px;
  padding: 48px 20px;

  ${media.belowLg`
    display: flex;
  `}
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
  top: ${({ $top }) => $top ?? 'auto'};
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  overflow: hidden;
`

export const AboutTextBlock = styled.div`
  position: absolute;
  left: 33.2%;
  top: 142px;
  width: 33.6%;
  text-align: center;
`

export const AboutHeading = styled.h2`
  font-size: 45px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 56px;
  margin-bottom: 24px;
`

export const AboutBody = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 28px;
  opacity: 0.80;
`

export const MobileTextBlock = styled.div`
  text-align: center;
  padding: 0 8px;
`

export const AboutHeadingMobile = styled.h2`
  font-size: clamp(1.75rem, 7vw, 45px);
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.25;
  margin-bottom: 20px;
`

export const MobileImageWrapper = styled.div<{ $ratio: string }>`
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  position: relative;
  overflow: hidden;
`
