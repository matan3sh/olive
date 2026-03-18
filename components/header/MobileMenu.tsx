'use client'

import type { RefObject } from 'react'
import type { Navigation } from '@/lib/cms'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/language-switcher'
import { SearchIcon, CloseSmIcon, CartIcon, AccountIcon, MenuIcon, CloseIcon } from '@/components/ui/icons'
import {
  ActionBtn,
  ActionLabel,
  HeaderDivider,
  LogoLink,
  LogoText,
  MobileActionsRow,
  MobileBar,
  MobileIconGroup,
  MobileNav,
  MobileNavLink,
  MobileSearchBar,
  MobileSearchInput,
  MobileWrapper,
} from './Header.styles'

interface Props {
  navLinks: Navigation['header']
  mobileOpen: boolean
  searchOpen: boolean
  onOpenSearch: () => void
  onCloseSearch: () => void
  onCloseMobileMenu: () => void
  onToggleMobileMenu: () => void
  mobileSearchRef: RefObject<HTMLInputElement | null>
}

export default function MobileMenu({
  navLinks,
  mobileOpen,
  searchOpen,
  onOpenSearch,
  onCloseSearch,
  onCloseMobileMenu,
  onToggleMobileMenu,
  mobileSearchRef,
}: Props) {
  const t = useTranslations('header')

  return (
    <MobileWrapper>
      <MobileBar>
        <LogoLink href="/">
          <LogoText>{t('siteName')}</LogoText>
        </LogoLink>
        <MobileIconGroup>
          <LanguageSwitcher />
          <ActionBtn
            aria-label={t('ariaSearch')}
            onClick={() => {
              if (!searchOpen) onOpenSearch()
              else onCloseSearch()
              onCloseMobileMenu()
            }}
          >
            <SearchIcon />
          </ActionBtn>
          <ActionBtn
            aria-label={mobileOpen ? t('ariaCloseMenu') : t('ariaOpenMenu')}
            onClick={onToggleMobileMenu}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </ActionBtn>
        </MobileIconGroup>
      </MobileBar>

      <MobileSearchBar $open={searchOpen}>
        <SearchIcon />
        <MobileSearchInput
          ref={mobileSearchRef}
          type="search"
          placeholder={t('searchPlaceholder')}
        />
        <ActionBtn onClick={onCloseSearch} aria-label="Close search">
          <CloseSmIcon />
        </ActionBtn>
      </MobileSearchBar>

      {mobileOpen && (
        <MobileNav aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              onClick={onCloseMobileMenu}
            >
              {link.label}
            </MobileNavLink>
          ))}
          <HeaderDivider />
          <MobileActionsRow>
            <ActionBtn aria-label={t('ariaCart')}>
              <CartIcon />
              <ActionLabel>{t('ariaCart')}</ActionLabel>
            </ActionBtn>
            <ActionBtn aria-label={t('ariaAccount')}>
              <AccountIcon />
              <ActionLabel>{t('ariaAccount')}</ActionLabel>
            </ActionBtn>
          </MobileActionsRow>
        </MobileNav>
      )}
    </MobileWrapper>
  )
}
