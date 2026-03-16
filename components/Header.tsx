'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

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

const actionLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 300,
  letterSpacing: '0.5px',
  color: '#050c03',
  fontFamily: 'var(--font-inter)',
}

const actionBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#050c03',
  padding: 0,
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
    <header style={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: '#ffffff', width: '100%' }}>

      {/* ── SEARCH OVERLAY (full nav width) ─────────────────────── */}
      {searchOpen && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#ffffff',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          gap: '12px',
          borderBottom: '1px solid rgba(151,151,151,0.20)',
        }}>
          <SearchIcon />
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search products..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              fontWeight: 300,
              color: '#050c03',
              backgroundColor: 'transparent',
              letterSpacing: '0.3px',
            }}
          />
          <button
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            style={{ ...actionBtnStyle, color: '#050c03' }}
          >
            <CloseSmIcon />
          </button>
        </div>
      )}

      {/* ── DESKTOP ─────────────────────────────────────────────── */}
      <div className="hidden md:block">
        {/* Row 1 — search left | logo center | cart+account right */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '72px',
          padding: '0 40px',
        }}>
          {/* Left: Search button */}
          <div style={{ position: 'absolute', left: '40px' }}>
            <button
              style={actionBtnStyle}
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon />
              <span style={actionLabelStyle}>Search</span>
            </button>
          </div>

          {/* Center: Logo */}
          <Link href="/" style={{ display: 'block', lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.png" alt="Cobram Estate" width={140} height={42} style={{ display: 'block' }} />
          </Link>

          {/* Right: Cart + Account */}
          <div style={{ position: 'absolute', right: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button style={actionBtnStyle} aria-label="Cart">
              <CartIcon />
              <span style={actionLabelStyle}>Cart</span>
            </button>
            <button style={actionBtnStyle} aria-label="Account">
              <AccountIcon />
              <span style={actionLabelStyle}>Account</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid rgba(151,151,151,0.20)', margin: 0 }} />

        {/* Row 2 — nav links centered */}
        <nav aria-label="Primary navigation" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          height: '68px',
          padding: '0 40px',
        }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: '20px',
              color: '#050c03',
              fontFamily: 'var(--font-inter)',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────── */}
      <div className="md:hidden">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          height: '64px',
        }}>
          <Link href="/" style={{ display: 'block', lineHeight: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo.png" alt="Cobram Estate" width={110} height={33} style={{ display: 'block' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={actionBtnStyle} aria-label="Search" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((o) => !o)}
              style={{ ...actionBtnStyle }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav aria-label="Mobile navigation" style={{
            borderTop: '1px solid rgba(151,151,151,0.20)',
            backgroundColor: '#ffffff',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: '15px', fontWeight: 300, color: '#050c03', fontFamily: 'var(--font-inter)', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
            <hr style={{ border: 'none', borderTop: '1px solid rgba(151,151,151,0.20)' }} />
            <div style={{ display: 'flex', gap: '24px' }}>
              <button style={actionBtnStyle} aria-label="Cart"><CartIcon /><span style={actionLabelStyle}>Cart</span></button>
              <button style={actionBtnStyle} aria-label="Account"><AccountIcon /><span style={actionLabelStyle}>Account</span></button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
