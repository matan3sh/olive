'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
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
  InlineSearchWrapper,
  InlineSearchInput,
  InlineSearchClose,
  MobileBar,
  MobileSearchBar,
  MobileSearchInput,
  MobileNav,
  MobileNavLink,
  Row1Left,
  Row1Right,
  LogoLink,
  MobileIconGroup,
  MobileActionsRow,
} from './Header.styles'

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
  const t = useTranslations('header')

  const NAV_LINKS = [
    { label: t('home'), href: '/' },
    { label: t('shop'), href: '/shop' },
    { label: t('whoWeAre'), href: '/about' },
    { label: t('ourOliveOil'), href: '/olive-oil' },
    { label: t('blog'), href: '/blog' },
    { label: t('inTheNews'), href: '/news' },
    { label: t('whereToBuy'), href: '/where-to-buy' },
  ]

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

      {/* ── DESKTOP ─────────────────────────────────────────────── */}
      <DesktopWrapper>
        {/* Row 1 — search left | logo center | cart+account right */}
        <Row1>
          {/* Left: Inline expanding search */}
          <Row1Left>
            <InlineSearchWrapper>
              <ActionBtn
                aria-label={t('ariaSearch')}
                onClick={() => setSearchOpen(true)}
              >
                <SearchIcon />
                {!searchOpen && <ActionLabel>{t('ariaSearch')}</ActionLabel>}
              </ActionBtn>
              <InlineSearchInput
                ref={searchInputRef}
                $open={searchOpen}
                type="search"
                placeholder={t('searchPlaceholder')}
              />
              <InlineSearchClose
                $open={searchOpen}
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                tabIndex={searchOpen ? 0 : -1}
              >
                <CloseSmIcon />
              </InlineSearchClose>
            </InlineSearchWrapper>
          </Row1Left>

          {/* Center: Logo */}
          <LogoLink href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.png" alt="Cobram Estate" width={140} height={42} />
          </LogoLink>

          {/* Right: Language Switcher + Cart + Account */}
          <Row1Right>
            <LanguageSwitcher />
            <ActionBtn aria-label={t('ariaCart')}>
              <CartIcon />
              <ActionLabel>{t('ariaCart')}</ActionLabel>
            </ActionBtn>
            <ActionBtn aria-label={t('ariaAccount')}>
              <AccountIcon />
              <ActionLabel>{t('ariaAccount')}</ActionLabel>
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
            <LanguageSwitcher />
            <ActionBtn
              aria-label={t('ariaSearch')}
              onClick={() => { setSearchOpen((o) => !o); setMobileOpen(false) }}
            >
              <SearchIcon />
            </ActionBtn>
            <ActionBtn
              aria-label={mobileOpen ? t('ariaCloseMenu') : t('ariaOpenMenu')}
              onClick={() => { setMobileOpen((o) => !o); setSearchOpen(false) }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </ActionBtn>
          </MobileIconGroup>
        </MobileBar>

        <MobileSearchBar $open={searchOpen}>
          <SearchIcon />
          <MobileSearchInput
            ref={searchOpen ? searchInputRef : undefined}
            type="search"
            placeholder={t('searchPlaceholder')}
          />
          <ActionBtn onClick={() => setSearchOpen(false)} aria-label="Close search">
            <CloseSmIcon />
          </ActionBtn>
        </MobileSearchBar>

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
              <ActionBtn aria-label={t('ariaCart')}><CartIcon /><ActionLabel>{t('ariaCart')}</ActionLabel></ActionBtn>
              <ActionBtn aria-label={t('ariaAccount')}><AccountIcon /><ActionLabel>{t('ariaAccount')}</ActionLabel></ActionBtn>
            </MobileActionsRow>
          </MobileNav>
        )}
      </MobileWrapper>
    </StyledHeader>
  )
}
