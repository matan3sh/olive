'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useTranslations } from 'next-intl'
import {
  AboutSectionEl,
  DesktopLayout,
  MobileLayout,
  AboutImageWrapper,
  AboutTextBlock,
  MobileTextBlock,
  MobileImageWrapper,
  AboutSectionTag,
  AboutTagLabel,
  AboutHeading,
  AboutRule,
  AboutBody,
  AboutDataGrid,
  AboutDataCell,
  AboutDataNum,
  AboutDataLabel,
} from './AboutSection.styles'

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null)
  const t = useTranslations('about')

  const DATA = [
    { id: 'cold-pressed', num: '100%', label: t('coldPressed'), dark: true },
    { id: 'acidity',      num: '0.2%', label: t('acidity'),      dark: false },
    { id: 'years',        num: '12',   label: t('yearsOfCraft'),  dark: false },
    { id: 'varieties',    num: '4',    label: t('oliveVarieties'), dark: false },
  ]

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

  const tagEl = (
    <AboutSectionTag className="about-tag">
      <AboutTagLabel>{t('tag')}</AboutTagLabel>
    </AboutSectionTag>
  )

  const headingEl = (
    <AboutHeading className="about-heading">
      {t('heading')}
    </AboutHeading>
  )

  const ruleEl = <AboutRule className="about-rule" />

  const bodyEl = (
    <AboutBody className="about-body">
      {t('body')}
    </AboutBody>
  )

  const dataGridEl = (
    <AboutDataGrid>
      {DATA.map(({ id, num, label, dark }) => (
        <AboutDataCell key={id} $dark={dark} className="about-data-cell">
          <AboutDataNum $dark={dark}>{num}</AboutDataNum>
          <AboutDataLabel $dark={dark}>{label}</AboutDataLabel>
        </AboutDataCell>
      ))}
    </AboutDataGrid>
  )

  return (
    <AboutSectionEl ref={containerRef} aria-label="About our olives">

      {/* ── DESKTOP: diagonal floating layout ──────────────── */}
      <DesktopLayout>
        {/* Image 1 — top left, floats freely */}
        <AboutImageWrapper className="about-img-1" $left="3.26%" $top={0} $width="32.15%" $height="400px">
          <Image
            src="/figma/about-1.jpg"
            alt="Fresh olives in a bowl"
            fill
            sizes="32vw"
            style={{ objectFit: 'contain', objectPosition: 'top left' }}
          />
        </AboutImageWrapper>

        {/* Image 2 — bottom right, floats freely */}
        <AboutImageWrapper className="about-img-2" $left="63%" $top="430px" $width="34%" $height="340px">
          <Image
            src="/figma/about-2.jpg"
            alt="Olive oil being poured"
            fill
            sizes="34vw"
            style={{ objectFit: 'contain', objectPosition: 'bottom right' }}
          />
        </AboutImageWrapper>

        {/* Centered text block */}
        <AboutTextBlock>
          {tagEl}
          {headingEl}
          {ruleEl}
          {bodyEl}
          {dataGridEl}
        </AboutTextBlock>
      </DesktopLayout>

      {/* ── MOBILE: stacked ────────────────────────────────── */}
      <MobileLayout>
        <MobileImageWrapper $ratio="463/334">
          <Image
            src="/figma/about-1.jpg"
            alt="Fresh olives in a bowl"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </MobileImageWrapper>

        <MobileTextBlock>
          {tagEl}
          {headingEl}
          {ruleEl}
          {bodyEl}
          {dataGridEl}
        </MobileTextBlock>

        <MobileImageWrapper $ratio="428/295">
          <Image
            src="/figma/about-2.jpg"
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
