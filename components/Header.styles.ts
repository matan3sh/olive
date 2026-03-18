import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'
import { hoverUnderline } from '@/styles/mixins'

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
  font-family: ${({ theme }) => theme.fonts.inter};
  ${hoverUnderline}
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

export const InlineSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const InlineSearchInput = styled.input<{ $open: boolean }>`
  max-width: ${({ $open }) => ($open ? '260px' : '0')};
  width: 260px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDark};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.3px;
  color: ${({ theme }) => theme.colors.textNav};
  background: transparent;
  padding: 3px 0;
`

export const InlineSearchClose = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.colors.textNav};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  max-width: ${({ $open }) => ($open ? '20px' : '0')};
  overflow: hidden;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.2s ease, max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
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
  font-family: ${({ theme }) => theme.fonts.inter};
  ${hoverUnderline}
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
  direction: ltr;
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

export const MobileSearchBar = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  max-height: ${({ $open }) => ($open ? '52px' : '0')};
  overflow: hidden;
  border-top: ${({ $open, theme }) => ($open ? `1px solid ${theme.colors.navBorder}` : 'none')};
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

export const MobileSearchInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textDark};
  outline: none;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textNav};
  background: transparent;
  padding: 14px 0;
  letter-spacing: 0.3px;
`
