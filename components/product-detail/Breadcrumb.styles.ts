import styled from 'styled-components'
import Link from 'next/link'
import { media } from '@/styles/media'

export const BreadcrumbBar = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 149px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sectionGreen};

  ${media.belowLg`
    padding: 24px 32px;
  `}

  ${media.belowSm`
    padding: 16px 20px;
  `}
`

export const BreadcrumbNav = styled.nav`
  font-size: 13px;
  font-weight: 300;
  color: rgba(17, 38, 12, 0.6);
  display: flex;
  gap: 8px;
  align-items: center;
`

export const BreadcrumbLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export const BreadcrumbCurrent = styled.span`
  color: ${({ theme }) => theme.colors.textDark};
  font-weight: 400;
`
