import Image from 'next/image'
import { HeroSectionEl, HeroOverlay, HeroContent, HeroTitle, HeroSubtitle, HeroCtaButton } from './HeroSection.styles'

export default function HeroSection() {
  return (
    <HeroSectionEl aria-label="Hero">
      <Image
        src="/figma/hero-bg.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        sizes="100vw"
      />
      <HeroOverlay />
      <HeroContent>
        <HeroTitle>
          Jezreel Valley Select
          <br />
          Extra Virgin Olive Oil
        </HeroTitle>
        <HeroSubtitle>The Valley Olive Oil</HeroSubtitle>
        <HeroCtaButton href="/shop">Shop now</HeroCtaButton>
      </HeroContent>
    </HeroSectionEl>
  )
}
