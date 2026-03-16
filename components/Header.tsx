'use client'

import { useState, useRef, useEffect } from 'react'
import {
  StyledHeader,
  DesktopWrapper,
  MobileWrapper,
  Row1,
  NavRow,
  HeaderDivider,
  NavLink,
  ActionBtn,
  ActionLabel,
  SearchOverlay,
  SearchInput,
  MobileBar,
  MobileNav,
  MobileNavLink,
  Row1Left,
  Row1Right,
  LogoLink,
  MobileIconGroup,
  MobileActionsRow,
} from './Header.styles'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Who we are', href: '/about' },
  { label: 'Our Olive Oil', href: '/olive-oil' },
  { label: 'Blog', href: '/blog' },
  { label: 'In The News', href: '/news' },
  { label: 'Where To Buy', href: '/where-to-buy' },
]

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CloseSmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  // Close search on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <StyledHeader>

      {/* ── SEARCH OVERLAY (full nav width) ─────────────────────── */}
      {searchOpen && (
        <SearchOverlay>
          <SearchIcon />
          <SearchInput
            ref={searchInputRef}
            type="search"
            placeholder="Search products..."
          />
          <ActionBtn
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <CloseSmIcon />
          </ActionBtn>
        </SearchOverlay>
      )}

      {/* ── DESKTOP ─────────────────────────────────────────────── */}
      <DesktopWrapper>
        {/* Row 1 — search left | logo center | cart+account right */}
        <Row1>
          {/* Left: Search button */}
          <Row1Left>
            <ActionBtn
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
              <ActionLabel>Search</ActionLabel>
            </ActionBtn>
          </Row1Left>

          {/* Center: Logo */}
          <LogoLink href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.png" alt="Cobram Estate" width={140} height={42} />
          </LogoLink>

          {/* Right: Cart + Account */}
          <Row1Right>
            <ActionBtn aria-label="Cart">
              <CartIcon />
              <ActionLabel>Cart</ActionLabel>
            </ActionBtn>
            <ActionBtn aria-label="Account">
              <AccountIcon />
              <ActionLabel>Account</ActionLabel>
            </ActionBtn>
          </Row1Right>
        </Row1>

        {/* Divider */}
        <HeaderDivider />

        {/* Row 2 — nav links centered */}
        <NavRow aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </NavRow>
      </DesktopWrapper>

      {/* ── MOBILE ──────────────────────────────────────────────── */}
      <MobileWrapper>
        <MobileBar>
          <LogoLink href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.png" alt="Cobram Estate" width={110} height={33} />
          </LogoLink>
          <MobileIconGroup>
            <ActionBtn aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </ActionBtn>
            <ActionBtn
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </ActionBtn>
          </MobileIconGroup>
        </MobileBar>

        {mobileOpen && (
          <MobileNav aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <MobileNavLink key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}>
                {link.label}
              </MobileNavLink>
            ))}
            <HeaderDivider />
            <MobileActionsRow>
              <ActionBtn aria-label="Cart"><CartIcon /><ActionLabel>Cart</ActionLabel></ActionBtn>
              <ActionBtn aria-label="Account"><AccountIcon /><ActionLabel>Account</ActionLabel></ActionBtn>
            </MobileActionsRow>
          </MobileNav>
        )}
      </MobileWrapper>
    </StyledHeader>
  )
}
