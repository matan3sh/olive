'use client'

import type { RefObject } from 'react'
import type { Navigation } from '@/lib/cms'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/language-switcher'
import { SearchIcon, CloseSmIcon, CartIcon, AccountIcon } from '@/components/ui/icons'
import {
  ActionBtn,
  ActionLabel,
  DesktopWrapper,
  HeaderDivider,
  InlineSearchClose,
  InlineSearchInput,
  InlineSearchWrapper,
  LogoLink,
  LogoText,
  NavLink,
  NavRow,
  Row1,
  Row1Left,
  Row1Right,
} from './Header.styles'

interface Props {
  navLinks: Navigation['header']
  searchOpen: boolean
  onOpenSearch: () => void
  onCloseSearch: () => void
  desktopSearchRef: RefObject<HTMLInputElement | null>
}

export default function DesktopNav({
  navLinks,
  searchOpen,
  onOpenSearch,
  onCloseSearch,
  desktopSearchRef,
}: Props) {
  const t = useTranslations('header')

  return (
    <DesktopWrapper>
      <Row1>
        <Row1Left>
          <InlineSearchWrapper>
            <ActionBtn aria-label={t('ariaSearch')} onClick={onOpenSearch}>
              <SearchIcon />
              {!searchOpen && <ActionLabel>{t('ariaSearch')}</ActionLabel>}
            </ActionBtn>
            <InlineSearchInput
              ref={desktopSearchRef}
              $open={searchOpen}
              type="search"
              placeholder={t('searchPlaceholder')}
            />
            <InlineSearchClose
              $open={searchOpen}
              onClick={onCloseSearch}
              aria-label="Close search"
              tabIndex={searchOpen ? 0 : -1}
            >
              <CloseSmIcon />
            </InlineSearchClose>
          </InlineSearchWrapper>
        </Row1Left>

        <LogoLink href="/">
          <LogoText>{t('siteName')}</LogoText>
        </LogoLink>

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

      <HeaderDivider />

      <NavRow aria-label="Primary navigation">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </NavRow>
    </DesktopWrapper>
  )
}
