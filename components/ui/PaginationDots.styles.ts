import styled from 'styled-components'

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
