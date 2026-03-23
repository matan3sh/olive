import type { Review } from '@/lib/cms'
import {
  ReviewsWrapper,
  ReviewsHeading,
  ReviewList,
  ReviewCard,
  ReviewStars,
  ReviewMeta,
  ReviewQuote,
  NoReviews,
} from './ReviewsSection.styles'

interface Props {
  reviews: Review[]
  heading: string
  noReviewsLabel: string
}

function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

export default function ReviewsSection({ reviews, heading, noReviewsLabel }: Props) {
  return (
    <ReviewsWrapper>
      <ReviewsHeading>{heading}</ReviewsHeading>
      {reviews.length === 0 ? (
        <NoReviews>{noReviewsLabel}</NoReviews>
      ) : (
        <ReviewList>
          {reviews.map((review) => (
            <ReviewCard key={review._id}>
              <ReviewStars>{renderStars(review.rating)}</ReviewStars>
              <ReviewMeta>
                {review.author} · {review.date}
              </ReviewMeta>
              <ReviewQuote>{review.quote}</ReviewQuote>
            </ReviewCard>
          ))}
        </ReviewList>
      )}
    </ReviewsWrapper>
  )
}
