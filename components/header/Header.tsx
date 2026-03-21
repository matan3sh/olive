'use client'

import type { Navigation } from '@/lib/cms'
import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { StyledHeader } from './Header.styles'
import DesktopNav from './DesktopNav'
import MobileMenu from './MobileMenu'
import { CartDrawer } from '@/components/cart'

interface Props {
  navigation: Navigation
}

export default function Header({ navigation }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const desktopSearchRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)

  const NAV_LINKS = navigation.header

  function openSearch(target: 'desktop' | 'mobile') {
    flushSync(() => setSearchOpen(true))
    const ref = target === 'desktop' ? desktopSearchRef : mobileSearchRef
    ref.current?.focus()
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <StyledHeader>
      <DesktopNav
        navLinks={NAV_LINKS}
        searchOpen={searchOpen}
        onOpenSearch={() => openSearch('desktop')}
        onCloseSearch={() => setSearchOpen(false)}
        desktopSearchRef={desktopSearchRef}
      />
      <MobileMenu
        navLinks={NAV_LINKS}
        mobileOpen={mobileOpen}
        searchOpen={searchOpen}
        onOpenSearch={() => openSearch('mobile')}
        onCloseSearch={() => setSearchOpen(false)}
        onCloseMobileMenu={() => setMobileOpen(false)}
        onToggleMobileMenu={() => {
          setMobileOpen((o) => !o)
          setSearchOpen(false)
        }}
        mobileSearchRef={mobileSearchRef}
      />
      <CartDrawer />
    </StyledHeader>
  )
}
