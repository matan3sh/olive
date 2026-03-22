'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useTranslations } from 'next-intl'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import type { WhoWeAreContent } from '@/lib/cms'
import ChapterSection from './ChapterSection'
import {
  PageWrapper,
  HeroSection,
  HeroEyebrow,
  HeroQuote,
  HeroRule,
  HeroSubtitle,
  StatsBar,
  StatCell,
  StatNum,
  StatLabel,
  CtaSection,
  CtaEyebrow,
  CtaHeading,
  CtaButton,
} from './WhoWeArePage.styles'

interface Props {
  content: WhoWeAreContent
  locale: string
}

export default function WhoWeArePage({ content, locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('whoWeAre')

  useGSAP(() => {
    // Hero — animates on load
    gsap.from('.wwa-hero-eyebrow', { opacity: 0, y: -8, duration: 0.5, ease: 'power2.out' })
    gsap.from('.wwa-hero-quote',   { opacity: 0, y: 24, duration: 0.8, delay: 0.2, ease: 'power2.out' })
    gsap.from('.wwa-hero-rule',    { scaleX: 0, duration: 0.5, delay: 0.5, ease: 'power2.out' })
    gsap.from('.wwa-hero-subtitle', { opacity: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' })

    // Chapters — scroll-triggered, once each
    content.chapters.forEach((chapter, i) => {
      ScrollTrigger.create({
        trigger: `.wwa-chapter-${i}`,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          const xFrom = chapter.side === 'left' ? -20 : 20
          const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
          tl.from(`.wwa-chapter-${i} .wwa-chapter-img`,     { opacity: 0, x: xFrom, duration: 0.9 }, 0)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-badge`,   { opacity: 0, duration: 0.4 }, 0)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-heading`, { opacity: 0, y: 16, duration: 0.6 }, 0.15)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-rule`,    { scaleX: 0, duration: 0.4 }, 0.3)
          tl.from(`.wwa-chapter-${i} .wwa-chapter-body`,    { opacity: 0, duration: 0.5 }, 0.4)
        },
      })
    })

    // Stats bar
    ScrollTrigger.create({
      trigger: '.wwa-stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.wwa-stat', { opacity: 0, y: 8, stagger: 0.07, duration: 0.5, ease: 'power2.out' })
      },
    })

    // CTA
    ScrollTrigger.create({
      trigger: '.wwa-cta',
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.from('.wwa-cta', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' })
      },
    })
  }, { scope: containerRef })

  return (
    <PageWrapper ref={containerRef}>
      <HeroSection>
        <HeroEyebrow className="wwa-hero-eyebrow">{t('heroEyebrow')}</HeroEyebrow>
        <HeroQuote className="wwa-hero-quote">{content.heroQuote}</HeroQuote>
        <HeroRule className="wwa-hero-rule" />
        <HeroSubtitle className="wwa-hero-subtitle">{content.heroSubtitle}</HeroSubtitle>
      </HeroSection>

      {content.chapters.map((chapter, i) => (
        <ChapterSection key={chapter._key} chapter={chapter} index={i} locale={locale} />
      ))}

      <StatsBar className="wwa-stats">
        {content.stats.map((stat) => (
          <StatCell key={stat.id} className="wwa-stat" $dark={stat.dark}>
            <StatNum $dark={stat.dark}>{stat.num}</StatNum>
            <StatLabel $dark={stat.dark}>{stat.label}</StatLabel>
          </StatCell>
        ))}
      </StatsBar>

      <CtaSection className="wwa-cta">
        <CtaEyebrow>{content.ctaEyebrow}</CtaEyebrow>
        <CtaHeading>{content.ctaHeading}</CtaHeading>
        <CtaButton href={`/${locale}/shop`}>{content.ctaLabel}</CtaButton>
      </CtaSection>
    </PageWrapper>
  )
}
