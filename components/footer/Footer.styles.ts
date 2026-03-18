import styled from 'styled-components'
import Link from 'next/link'
import { hoverUnderline } from '@/styles/mixins'

export const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 2px solid ${({ theme }) => theme.colors.textDark};
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
  font-weight: 900;
  letter-spacing: 0.3em;
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
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDark};
  ${hoverUnderline}
`

export const FooterCopyright = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
`
