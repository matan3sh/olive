import styled from 'styled-components'

export const ReviewsWrapper = styled.section`
  padding: 20px 0 0;
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
`

export const ReviewCard = styled.li`
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.sectionGreen};

  &:first-child {
    border-top: none;
    padding-top: 4px;
  }
`

export const ReviewStars = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.warningAmber};
  letter-spacing: 3px;
  margin-bottom: 10px;
`

export const ReviewMeta = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.45;
  margin-bottom: 10px;
`

export const ReviewQuote = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  line-height: 1.8;
  opacity: 0.85;
`

export const NoReviews = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
  letter-spacing: 0.3px;
  opacity: 0.45;
`
