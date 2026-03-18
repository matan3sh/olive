'use client'

import {
  HeroCtaButton,
  HeroEyebrow,
  HeroRight,
  HeroSubRow,
  HeroThinText,
  HeroTitle,
} from './HeroSection.styles'

interface Props {
  tag: string
  title: string
  subtitle: string
  cta: string
}

export default function HeroContent({ tag, title, subtitle, cta }: Props) {
  return (
    <HeroRight>
      <HeroEyebrow className="hero-eyebrow">{tag}</HeroEyebrow>

      <HeroTitle className="hero-title">{title}</HeroTitle>

      <HeroSubRow>
        <HeroThinText className="hero-thin-text">{subtitle}</HeroThinText>
        <HeroCtaButton href="/shop" className="hero-cta">
          {cta}
        </HeroCtaButton>
      </HeroSubRow>
    </HeroRight>
  )
}
