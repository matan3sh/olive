import styled from 'styled-components'
import { media } from '@/styles/media'

export const DrawerBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.inter};
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navBorder};
  flex-shrink: 0;
`

export const DrawerTitle = styled.h2`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  margin: 0;
`

export const DrawerCloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textDark};
  }
`

export const DrawerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`
