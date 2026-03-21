import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'
import { darkButtonBase } from '@/styles/mixins'

export const PageWrapper = styled.main`
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 60vh;
`

export const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 56px 56px 80px;

  ${media.belowLg`
    padding: 40px 32px 60px;
  `}

  ${media.belowSm`
    padding: 32px 20px 48px;
  `}
`

export const PageHeading = styled.div`
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionBorder};
`

export const PageEyebrow = styled.p`
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 8px;
`

export const PageTitle = styled.h1`
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 6px;
`

export const PageItemCount = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  align-items: start;

  ${media.belowLg`
    grid-template-columns: 1fr;
    gap: 32px;
  `}
`

export const ColumnHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 110px 90px 90px;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navBorder};
  margin-bottom: 4px;

  ${media.belowMd`
    display: none;
  `}
`

export const ColHeader = styled.span<{ $align?: 'center' | 'right' }>`
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  text-align: ${({ $align }) => $align ?? 'left'};
`

export const PageItemRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 110px 90px 90px;
  gap: 16px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navBorder};

  ${media.belowMd`
    grid-template-columns: 1fr;
    gap: 12px;
  `}
`

export const PageItemInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const PageItemImageBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.imageBg};
  flex-shrink: 0;
  position: relative;
  padding: 8px;

  ${media.belowSm`
    width: 60px;
    height: 60px;
  `}
`

export const PageItemName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 3px;
  letter-spacing: 0.04em;
`

export const PageItemSize = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 8px;
`

export const PageRemoveBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  letter-spacing: 0.08em;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${({ theme }) => theme.colors.textDark};
  }
`

export const PageQtyControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  width: 90px;

  ${media.belowMd`
    width: 80px;
    justify-content: flex-start;
    justify-self: left;
  `}
`

export const PageQtyBtn = styled.button`
  background: none;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1;

  &:hover { color: ${({ theme }) => theme.colors.textDark}; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`

export const PageQtyValue = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
  min-width: 20px;
  text-align: center;
`

export const PageUnitPrice = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: right;

  ${media.belowMd`
    display: none;
  `}
`

export const PageLineTotal = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textDark};
  text-align: right;

  ${media.belowMd`
    text-align: left;
  `}
`

export const ContinueLink = styled(Link)`
  display: inline-block;
  margin-top: 24px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover { opacity: 0.7; }
`

export const SummaryPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.imageBg};
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};

  ${media.belowLg`
    width: 100%;
  `}
`

export const EmptyPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
  text-align: center;
`

export const EmptyPageTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0 0 10px;
`

export const EmptyPageSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 32px;
`

export const GoShopBtn = styled(Link)`
  ${darkButtonBase}
  padding: 14px 32px;
  font-size: 11px;
  text-decoration: none;
`
