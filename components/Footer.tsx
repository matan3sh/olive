'use client'
import {
  StyledFooter,
  FooterInner,
  FooterBrand,
  FooterNavList,
  FooterNavLink,
  FooterCopyright,
} from './Footer.styles'

const FOOTER_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Where To Buy', href: '/where-to-buy' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <StyledFooter>
      <FooterInner>
        <FooterBrand href="/">The Valley</FooterBrand>
        <nav aria-label="Footer navigation">
          <FooterNavList>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
              </li>
            ))}
          </FooterNavList>
        </nav>
        <FooterCopyright>
          &copy; {new Date().getFullYear()} The Valley Olive Oil. All rights reserved.
        </FooterCopyright>
      </FooterInner>
    </StyledFooter>
  )
}
