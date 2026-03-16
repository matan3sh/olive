import styled from 'styled-components'

export const TestimonialsSectionEl = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  min-height: 363px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`

export const TestimonialsInner = styled.div`
  max-width: 753px;
  width: 100%;
  text-align: center;
`

export const TestimonialsHeading = styled.h2`
  font-size: clamp(1.75rem, 3.2vw, 45px);
  font-weight: 400;
  line-height: 60px;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 20px;
`

export const QuoteMark = styled.div`
  color: ${({ theme }) => theme.colors.quoteGreen};
  font-size: 60px;
  line-height: 1;
  height: 24px;
  overflow: visible;
  margin-bottom: 24px;
  font-family: Georgia, serif;
  user-select: none;
`

export const QuoteText = styled.blockquote`
  font-size: 18px;
  font-weight: 300;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.80;
  margin-bottom: 16px;
  font-style: normal;
`

export const QuoteAuthor = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 28px;
`

export const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
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
