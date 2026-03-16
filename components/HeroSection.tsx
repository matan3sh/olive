'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import {
  HeroSectionEl,
  HeroOverlay,
  HeroGrid,
  HeroLeft,
  HeroIssueTag,
  HeroNumber,
  HeroSideLabel,
  HeroRight,
  HeroEyebrow,
  HeroTitle,
  HeroSubRow,
  HeroThinText,
  HeroCtaButton,
  HeroMobileBadge,
  HeroMobileNum,
  HeroMobileTag,
} from './HeroSection.styles'

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('.hero-number', { opacity: 0, y: 16, duration: 1.0 }, 0.15)
      tl.from('.hero-side-label', { opacity: 0, duration: 0.6 }, 0.4)
      tl.from('.hero-eyebrow', { opacity: 0, x: -12, duration: 0.6 }, 0.4)
      tl.from('.hero-title', { opacity: 0, y: 24, duration: 0.8 }, 0.5)
      tl.from('.hero-thin-text', { opacity: 0, duration: 0.5 }, 0.8)
      tl.from('.hero-cta', { opacity: 0, y: 8, duration: 0.5 }, 0.9)
    })

    mm.add('(max-width: 900px)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.from('.hero-mobile-badge', { opacity: 0, duration: 0.5 }, 0.1)
      tl.from('.hero-title', { opacity: 0, y: 16, duration: 0.7 }, 0.2)
      tl.from('.hero-cta', { opacity: 0, y: 8, duration: 0.4 }, 0.6)
    })
  }, { scope: containerRef })

  return (
    <HeroSectionEl ref={containerRef} aria-label="Hero">
      <Image
        src="/figma/hero-bg.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        sizes="100vw"
      />
      <HeroOverlay />

      <HeroGrid>
        {/* Dark left column — Swiss section number */}
        <HeroLeft>
          <HeroIssueTag>Harvest No.</HeroIssueTag>
          <HeroNumber className="hero-number">01</HeroNumber>
          <HeroSideLabel className="hero-side-label">Premium Reserve — 2024</HeroSideLabel>
        </HeroLeft>

        {/* Right content panel */}
        <HeroRight>
          <HeroEyebrow className="hero-eyebrow">Extra Virgin Olive Oil</HeroEyebrow>

          {/* Mobile only: compact number badge */}
          <HeroMobileBadge className="hero-mobile-badge">
            <HeroMobileNum>01</HeroMobileNum>
            <HeroMobileTag>Premium Reserve — 2024</HeroMobileTag>
          </HeroMobileBadge>

          <HeroTitle className="hero-title">
            Jezreel Valley Select
            <br />
            Extra Virgin Olive Oil
          </HeroTitle>

          <HeroSubRow>
            <HeroThinText className="hero-thin-text">Cold Pressed · Hand Picked</HeroThinText>
            <HeroCtaButton href="/shop" className="hero-cta">Shop Now</HeroCtaButton>
          </HeroSubRow>
        </HeroRight>
      </HeroGrid>
    </HeroSectionEl>
  )
}
