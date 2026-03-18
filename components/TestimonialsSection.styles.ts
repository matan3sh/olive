import styled from 'styled-components'
import { media } from '@/styles/media'

export const TestimonialsSectionEl = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.sectionBorder};
`

export const TestimonialsInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 72px 60px;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 40px;
  align-items: start;

  [dir="rtl"] & {
    grid-template-columns: 1fr 100px;
    direction: rtl;
  }

  ${media.belowLg`
    grid-template-columns: 1fr;
    padding: 48px 24px;
    gap: 0;
  `}

  ${media.belowSm`
    padding: 40px 20px;
  `}
`

export const TestimonialsAccentCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 4px;

  [dir="rtl"] & {
    align-items: flex-end;
    order: 1;
  }

  ${media.belowLg`
    display: none;
  `}
`

export const TestimonialsLargeNum = styled.span`
  font-size: 88px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.sectionGreen};
  line-height: 1;
  letter-spacing: -0.05em;
  display: block;
`

export const TestimonialsContentCol = styled.div`
  text-align: left;

  [dir="rtl"] & {
    text-align: right;
  }
`

export const TestimonialsSectionTag = styled.div`
  font-size: 9px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.45;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: none;
  }

  ${media.belowLg`
    margin-bottom: 20px;
  `}
`

export const TestimonialsHeading = styled.h2`
  font-size: clamp(1.5rem, 2.8vw, 36px);
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 32px;

  ${media.belowLg`
    margin-bottom: 24px;
  `}
`

export const QuoteText = styled.blockquote`
  font-size: 17px;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.80;
  margin-bottom: 16px;
  font-style: normal;
  padding-left: 20px;
  border-left: 3px solid ${({ theme }) => theme.colors.textDark};

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: 20px;
    border-left: none;
    border-right: 3px solid ${({ theme }) => theme.colors.textDark};
  }
`

export const QuoteAuthor = styled.p`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 32px;
  padding-left: 20px;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: 20px;
  }
`

export const DotsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  padding-left: 20px;

  [dir="rtl"] & {
    padding-left: 0;
    padding-right: 20px;
    justify-content: flex-end;
  }
`

interface DotProps {
  $active: boolean
}

export const Dot = styled.button<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $active, theme }) => $active ? theme.colors.dotDark : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.dotDark};
  opacity: ${({ $active }) => $active ? 1 : 0.36};
  padding: 0;
  cursor: pointer;
  transition: opacity 0.2s, background-color 0.2s;
`
