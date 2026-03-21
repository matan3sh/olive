import styled from 'styled-components'
import Link from 'next/link'
import { darkButtonBase } from '@/styles/mixins'

export const SummaryWrapper = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.navBorder};
  background-color: ${({ theme }) => theme.colors.white};
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
`

export const SummaryLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.muted};
`

export const SummaryValue = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textDark};
`

export const SummaryNote = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
  font-style: italic;
`

export const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  margin: 12px 0;
`

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20px;
`

export const TotalLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
`

export const TotalValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
`

export const CheckoutBtn = styled.button`
  ${darkButtonBase}
  width: 100%;
  height: 46px;
  font-size: 11px;
  letter-spacing: 0.2em;
  margin-bottom: 10px;
`

export const ViewCartBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  border: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  text-decoration: none;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.textDark};
  }
`

export const SecureNote = styled.p`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  letter-spacing: 0.05em;
  margin-top: 10px;
  margin-bottom: 0;
`
