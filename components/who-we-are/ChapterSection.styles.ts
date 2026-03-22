import styled from 'styled-components'
import { media } from '@/styles/media'

export const ChapterWrapper = styled.section<{ $index: number }>`
  background-color: ${({ $index, theme }) =>
    $index % 2 === 0 ? theme.colors.white : theme.colors.sectionGreen};
  width: 100%;
  overflow: hidden;
`

export const ChapterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionBorder};

  ${media.belowMd`
    padding: 14px 24px;
  `}
`

export const ChapterBadge = styled.span`
  background: ${({ theme }) => theme.colors.textDark};
  color: ${({ theme }) => theme.colors.sectionGreen};
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
  padding: 2px 7px;
`

export const ChapterLabel = styled.span`
  font-size: 8px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.5;
`

export const ChapterColumns = styled.div<{ $side: 'left' | 'right' }>`
  display: flex;
  flex-direction: ${({ $side }) => ($side === 'right' ? 'row-reverse' : 'row')};
  min-height: 380px;

  ${media.belowMd`
    flex-direction: column;
  `}
`

export const ChapterImageCol = styled.div`
  width: 42%;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  ${media.belowMd`
    width: 100%;
    aspect-ratio: 4/3;
  `}
`

export const ChapterTextCol = styled.div`
  flex: 1;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.belowMd`
    padding: 32px 24px;
  `}
`

export const ChapterHeading = styled.h2`
  font-size: clamp(1.4rem, 2.5vw, 36px);
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-transform: uppercase;
  margin-bottom: 16px;
`

export const ChapterRule = styled.div`
  width: 20px;
  height: 2px;
  background: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 16px;
  transform-origin: left center;
`

export const ChapterBodyText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.75;
  opacity: 0.7;
`
