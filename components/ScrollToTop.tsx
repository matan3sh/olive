'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    // Temporarily disable smooth scroll so the jump is instant
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    // Restore smooth scroll after the frame
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = ''
    })
  }, [pathname])

  return null
}
