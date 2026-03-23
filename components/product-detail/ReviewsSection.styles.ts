import styled from 'styled-components'

export const ReviewsWrapper = styled.section`
  padding: 40px 0 0;
`

export const ReviewsHeading = styled.h3`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 20px;
`

export const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const ReviewCard = styled.li`
  border-top: 1px solid ${({ theme }) => theme.colors.sectionGreen};
  padding-top: 16px;
`

export const ReviewStars = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 4px;
`

export const ReviewMeta = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 8px;
`

export const ReviewQuote = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 22px;
`

export const NoReviews = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  opacity: 0.5;
`
