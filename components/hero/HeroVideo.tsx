'use client'

import type { RefObject } from 'react'
import { IconMuted, IconUnmuted } from '@/components/ui/icons'
import {
  HeroLeft,
  HeroSideLabel,
  HeroSoundToggle,
  HeroVideoEl,
  HeroVideoOverlay,
} from './HeroSection.styles'

interface Props {
  src: string
  videoRef: RefObject<HTMLVideoElement | null>
  muted: boolean
  onToggleSound: () => void
  sideLabel: string
  ariaUnmute: string
  ariaMute: string
}

export default function HeroVideo({
  src,
  videoRef,
  muted,
  onToggleSound,
  sideLabel,
  ariaUnmute,
  ariaMute,
}: Props) {
  return (
    <HeroLeft className="hero-left-col">
      <HeroVideoEl ref={videoRef} src={src} autoPlay loop muted playsInline />
      <HeroVideoOverlay />
      <HeroSoundToggle
        className="hero-sound-toggle"
        onClick={onToggleSound}
        aria-label={muted ? ariaUnmute : ariaMute}
      >
        {muted ? <IconMuted /> : <IconUnmuted />}
      </HeroSoundToggle>
      <HeroSideLabel className="hero-side-label">{sideLabel}</HeroSideLabel>
    </HeroLeft>
  )
}
