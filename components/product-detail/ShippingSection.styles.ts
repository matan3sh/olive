import styled from 'styled-components'

export const ShippingWrapper = styled.section`
  padding: 0;
`

export const ShippingHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 16px;
`

export const ShippingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const ShippingTh = styled.th`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.4;
  text-align: start;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionGreen};
`

export const ShippingTd = styled.td`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionGreen};
  vertical-align: top;
`

export const ShippingNotes = styled.p`
  font-size: 12px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.6;
  margin-top: 12px;
  line-height: 1.6;
`

export const FreeThresholdNote = styled.span`
  display: block;
  font-size: 11px;
  opacity: 0.6;
`
