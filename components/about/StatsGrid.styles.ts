import styled from 'styled-components'

export const AboutDataGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: ${({ theme }) => theme.colors.textDark};
  border: 1px solid ${({ theme }) => theme.colors.textDark};
  margin-top: 28px;
  text-align: left;
`

interface DataCellProps {
  $dark?: boolean
}

export const AboutDataCell = styled.div<DataCellProps>`
  background: ${({ $dark, theme }) => $dark ? theme.colors.textDark : theme.colors.white};
  padding: 14px 16px;
`

export const AboutDataNum = styled.div<DataCellProps>`
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  color: ${({ $dark, theme }) => $dark ? theme.colors.sectionGreen : theme.colors.textDark};
  margin-bottom: 4px;
`

export const AboutDataLabel = styled.div<DataCellProps>`
  font-size: 8px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ $dark, theme }) => $dark ? 'rgba(233,238,226,0.45)' : theme.colors.textDark};
  opacity: ${({ $dark }) => $dark ? 1 : 0.5};
  font-weight: 400;
`
