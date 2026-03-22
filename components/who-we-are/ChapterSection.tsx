import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import type { WhoWeAreChapter } from '@/lib/cms'
import {
  ChapterWrapper,
  ChapterHeader,
  ChapterBadge,
  ChapterLabel,
  ChapterColumns,
  ChapterImageCol,
  ChapterTextCol,
  ChapterHeading,
  ChapterRule,
  ChapterBodyText,
} from './ChapterSection.styles'

interface Props {
  chapter: WhoWeAreChapter
  index: number
  locale: string
}

export default async function ChapterSection({ chapter, index, locale }: Props) {
  const num = String(index + 1).padStart(2, '0')
  const t = await getTranslations({ locale, namespace: 'whoWeAre' })

  return (
    <ChapterWrapper
      $index={index}
      className={`wwa-chapter-${index}`}
      aria-label={t('chapterAriaLabel', { num: index + 1 })}
    >
      <ChapterHeader>
        <ChapterBadge className="wwa-chapter-badge">{num}</ChapterBadge>
        <ChapterLabel className="wwa-chapter-label">{chapter.label}</ChapterLabel>
      </ChapterHeader>
      <ChapterColumns $side={chapter.side}>
        <ChapterImageCol className="wwa-chapter-img">
          <Image
            src={chapter.image}
            alt={chapter.heading}
            fill
            sizes="(max-width: 767px) 100vw, 42vw"
            style={{ objectFit: 'cover' }}
          />
        </ChapterImageCol>
        <ChapterTextCol>
          <ChapterHeading className="wwa-chapter-heading">{chapter.heading}</ChapterHeading>
          <ChapterRule className="wwa-chapter-rule" />
          <ChapterBodyText className="wwa-chapter-body">{chapter.body}</ChapterBodyText>
        </ChapterTextCol>
      </ChapterColumns>
    </ChapterWrapper>
  )
}
