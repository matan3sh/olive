import styled from 'styled-components'

export const SwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textNav};
`

export const LangBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 600 : 300)};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textNav};
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const LangDivider = styled.span`
  opacity: 0.3;
  font-weight: 300;
`
