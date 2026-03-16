import styled from 'styled-components'
import Link from 'next/link'

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.sectionBorder};
  padding: 3rem 2rem;
`

export const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
`

export const FooterBrand = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors.textDark};
  text-transform: uppercase;
`

export const FooterNavList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const FooterNavLink = styled(Link)`
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textDark};
`

export const FooterCopyright = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
`
