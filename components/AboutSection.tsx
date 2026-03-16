'use client'
import Image from 'next/image'
import {
  AboutSectionEl,
  DesktopLayout,
  MobileLayout,
  AboutImageWrapper,
  AboutTextBlock,
  AboutHeading,
  AboutBody,
  MobileTextBlock,
  AboutHeadingMobile,
  MobileImageWrapper,
} from './AboutSection.styles'

export default function AboutSection() {
  return (
    <AboutSectionEl aria-label="About our olives">

      {/* ── DESKTOP: diagonal editorial layout ─────────────────── */}
      <DesktopLayout>
        <AboutImageWrapper $left="3.26%" $top={0} $width="32.15%" $height="334px">
          <Image
            src="/figma/about-1.jpg"
            alt="Fresh olives in a bowl"
            fill
            sizes="32vw"
            style={{ objectFit: 'cover' }}
          />
        </AboutImageWrapper>

        <AboutImageWrapper $left="66.8%" $top="334px" $width="29.72%" $height="295px">
          <Image
            src="/figma/about-2.jpg"
            alt="Olive oil being poured"
            fill
            sizes="30vw"
            style={{ objectFit: 'cover' }}
          />
        </AboutImageWrapper>

        <AboutTextBlock>
          <AboutHeading>IT&apos;S ALL ABOUT THOSE OLIVES</AboutHeading>
          <AboutBody>
            Extra Virgin Olive Oil is simply the juice of fantastically
            healthy olives. And that&apos;s all it is—so the quality of
            the oil depends entirely on the quality of the olives.
          </AboutBody>
        </AboutTextBlock>
      </DesktopLayout>

      {/* ── MOBILE: stacked layout ──────────────────────────────── */}
      <MobileLayout>
        <MobileImageWrapper $ratio="463/334">
          <Image src="/figma/about-1.jpg" alt="Fresh olives in a bowl" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </MobileImageWrapper>
        <MobileTextBlock>
          <AboutHeadingMobile>IT&apos;S ALL ABOUT THOSE OLIVES</AboutHeadingMobile>
          <AboutBody>
            Extra Virgin Olive Oil is simply the juice of fantastically healthy olives. And that&apos;s all it is—so the quality of the oil depends entirely on the quality of the olives.
          </AboutBody>
        </MobileTextBlock>
        <MobileImageWrapper $ratio="428/295">
          <Image src="/figma/about-2.jpg" alt="Olive oil being poured" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </MobileImageWrapper>
      </MobileLayout>

    </AboutSectionEl>
  )
}
