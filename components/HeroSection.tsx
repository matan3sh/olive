'use client'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  HeroCtaButton,
  HeroEyebrow,
  HeroGrid,
  HeroLeft,
HeroOverlay,
  HeroRight,
  HeroSectionEl,
  HeroSideLabel,
  HeroSoundToggle,
  HeroSubRow,
  HeroThinText,
  HeroTitle,
  HeroVideoEl,
  HeroVideoOverlay,
} from './HeroSection.styles'

function IconMuted() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function IconUnmuted() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const t = useTranslations('hero')

  function toggleSound() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 901px)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
        tl.from('.hero-left-col', { opacity: 0, x: -20, duration: 0.9 }, 0)
        tl.from('.hero-sound-toggle', { opacity: 0, duration: 0.4 }, 0.5)
        tl.from('.hero-eyebrow', { opacity: 0, x: -12, duration: 0.6 }, 0.4)
        tl.from('.hero-title', { opacity: 0, y: 24, duration: 0.8 }, 0.5)
        tl.from('.hero-thin-text', { opacity: 0, duration: 0.5 }, 0.8)
        tl.from('.hero-cta', { opacity: 0, y: 8, duration: 0.5 }, 0.9)
      })

      mm.add('(max-width: 900px)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
        tl.from('.hero-eyebrow', { opacity: 0, y: -8, duration: 0.5 }, 0.1)
        tl.from('.hero-title', { opacity: 0, y: 16, duration: 0.7 }, 0.2)
        tl.from('.hero-thin-text', { opacity: 0, duration: 0.4 }, 0.5)
        tl.from('.hero-cta', { opacity: 0, y: 8, duration: 0.4 }, 0.7)
      })
    },
    { scope: containerRef },
  )

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
        {/* Dark left column — video background + Swiss section number */}
        <HeroLeft className="hero-left-col">
          <HeroVideoEl
            ref={videoRef}
            src="/vid.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <HeroVideoOverlay />
          <HeroSoundToggle
            className="hero-sound-toggle"
            onClick={toggleSound}
            aria-label={muted ? t('ariaUnmute') : t('ariaMute')}
          >
            {muted ? <IconMuted /> : <IconUnmuted />}
          </HeroSoundToggle>
          <HeroSideLabel className="hero-side-label">
            {t('sideLabel')}
          </HeroSideLabel>
        </HeroLeft>

        {/* Right content panel */}
        <HeroRight>
          <HeroEyebrow className="hero-eyebrow">
            {t('tag')}
          </HeroEyebrow>

          <HeroTitle className="hero-title">
            {t('title')}
          </HeroTitle>

          <HeroSubRow>
            <HeroThinText className="hero-thin-text">
              {t('subtitle')}
            </HeroThinText>
            <HeroCtaButton href="/shop" className="hero-cta">
              {t('cta')}
            </HeroCtaButton>
          </HeroSubRow>
        </HeroRight>
      </HeroGrid>
    </HeroSectionEl>
  )
}
