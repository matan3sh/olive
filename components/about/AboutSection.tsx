'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { AboutContent } from '@/lib/cms'
import {
  AboutSectionEl,
  AboutImageWrapper,
  AboutTextBlock,
  DesktopLayout,
  MobileImageWrapper,
  MobileLayout,
  MobileTextBlock,
} from './AboutSection.styles'
import AboutContentPanel from './AboutContent'

interface Props {
  about: AboutContent
}

export default function AboutSection({ about }: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      })
      tl.from('.about-img-1', { opacity: 0, x: -20, duration: 0.9 }, 0)
      tl.from('.about-img-2', { opacity: 0, x: 20,  duration: 0.9 }, 0.15)
      tl.from('.about-tag',     { opacity: 0, y: -8,  duration: 0.5 }, 0.2)
      tl.from('.about-heading', { opacity: 0, y: 24,  duration: 0.7 }, 0.3)
      tl.from('.about-rule',    { scaleX: 0,          duration: 0.5 }, 0.5)
      tl.from('.about-body',    { opacity: 0, y: 10,  duration: 0.6 }, 0.55)
      tl.from('.about-data-cell', { opacity: 0, y: 8, stagger: 0.07, duration: 0.5 }, 0.65)
    })

    mm.add('(max-width: 900px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.from('.about-tag',     { opacity: 0, duration: 0.4, ease: 'power2.out' })
          gsap.from('.about-heading', { opacity: 0, y: 12, duration: 0.5, delay: 0.1, ease: 'power2.out' })
          gsap.from('.about-rule',    { scaleX: 0,         duration: 0.4, delay: 0.2, ease: 'power2.out' })
          gsap.from('.about-body',    { opacity: 0, duration: 0.4, delay: 0.3, ease: 'power2.out' })
          gsap.from('.about-data-cell', { opacity: 0, stagger: 0.05, duration: 0.4, delay: 0.4, ease: 'power2.out' })
        },
      })
    })
  }, { scope: containerRef })

  return (
    <AboutSectionEl ref={containerRef} aria-label="About our olives">

      <DesktopLayout>
        <AboutImageWrapper className="about-img-1" $left="3.26%" $top={0} $width="32.15%" $height="400px">
          <Image
            src={about.image1}
            alt="Fresh olives in a bowl"
            fill
            sizes="32vw"
            style={{ objectFit: 'contain', objectPosition: 'top left' }}
          />
        </AboutImageWrapper>

        <AboutImageWrapper className="about-img-2" $left="63%" $top="430px" $width="34%" $height="340px">
          <Image
            src={about.image2}
            alt="Olive oil being poured"
            fill
            sizes="34vw"
            style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
          />
        </AboutImageWrapper>

        <AboutTextBlock>
          <AboutContentPanel about={about} />
        </AboutTextBlock>
      </DesktopLayout>

      <MobileLayout>
        <MobileImageWrapper $ratio="463/334">
          <Image
            src={about.image1}
            alt="Fresh olives in a bowl"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </MobileImageWrapper>

        <MobileTextBlock>
          <AboutContentPanel about={about} />
        </MobileTextBlock>

        <MobileImageWrapper $ratio="428/295">
          <Image
            src={about.image2}
            alt="Olive oil being poured"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </MobileImageWrapper>
      </MobileLayout>

    </AboutSectionEl>
  )
}
