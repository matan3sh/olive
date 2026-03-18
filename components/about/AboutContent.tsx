'use client'

import type { AboutContent } from '@/lib/cms'
import {
  AboutBody,
  AboutHeading,
  AboutRule,
  AboutSectionTag,
  AboutTagLabel,
} from './AboutSection.styles'
import StatsGrid from './StatsGrid'

interface Props {
  about: AboutContent
}

export default function AboutContentPanel({ about }: Props) {
  return (
    <>
      <AboutSectionTag className="about-tag">
        <AboutTagLabel>{about.tag}</AboutTagLabel>
      </AboutSectionTag>

      <AboutHeading className="about-heading">{about.heading}</AboutHeading>

      <AboutRule className="about-rule" />

      <AboutBody className="about-body">{about.body}</AboutBody>

      <StatsGrid stats={about.stats} />
    </>
  )
}
