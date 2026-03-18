'use client'

import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { HeroContent } from '@/lib/cms'
import { HeroGrid, HeroOverlay, HeroSectionEl } from './HeroSection.styles'
import HeroVideo from './HeroVideo'
import HeroContentPanel from './HeroContent'

interface Props {
  hero: HeroContent
}

export default function HeroSection({ hero }: Props) {
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
        src={hero.backgroundImage}
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        sizes="100vw"
      />
      <HeroOverlay />

      <HeroGrid>
        <HeroVideo
          src={hero.video}
          videoRef={videoRef}
          muted={muted}
          onToggleSound={toggleSound}
          sideLabel={hero.sideLabel}
          ariaUnmute={t('ariaUnmute')}
          ariaMute={t('ariaMute')}
        />
        <HeroContentPanel
          tag={hero.tag}
          title={hero.title}
          subtitle={hero.subtitle}
          cta={hero.cta}
        />
      </HeroGrid>
    </HeroSectionEl>
  )
}
