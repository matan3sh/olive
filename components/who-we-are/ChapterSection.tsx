import Image from 'next/image'
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
  ariaLabel: string
}

export default function ChapterSection({ chapter, index, ariaLabel }: Props) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <ChapterWrapper
      $index={index}
      className={`wwa-chapter-${index}`}
      aria-label={ariaLabel}
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
