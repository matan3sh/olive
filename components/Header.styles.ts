import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.textDark};
`

export const DesktopWrapper = styled.div`
  display: none;
  ${media.aboveLg`display: block;`}
`

export const MobileWrapper = styled.div`
  display: block;
  ${media.aboveLg`display: none;`}
`

export const Row1 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme }) => theme.header.row1Height};
  padding: 0 40px;
`

export const NavRow = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  height: ${({ theme }) => theme.header.row2Height};
  padding: 0 40px;
`

export const HeaderDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.navBorder};
  margin: 0;
`

export const NavLink = styled(Link)`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textNav};
  white-space: nowrap;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.inter};
`

export const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textNav};
  padding: 0;
`

export const ActionLabel = styled.span`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textNav};
`

export const SearchOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 60;
  display: flex;
  align-items: center;
  padding: 0 40px;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.navBorder};
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textNav};
  background-color: transparent;
  letter-spacing: 0.3px;
`

export const MobileBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: ${({ theme }) => theme.header.mobileHeight};
`

export const MobileNav = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.navBorder};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const MobileNavLink = styled(Link)`
  font-size: 15px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textNav};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.inter};
`

export const Row1Left = styled.div`
  position: absolute;
  left: 40px;
`

export const Row1Right = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
`

export const LogoLink = styled(Link)`
  display: block;
  line-height: 0;
`

export const MobileIconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const MobileActionsRow = styled.div`
  display: flex;
  gap: 24px;
`
