'use client'
import { useTranslations } from 'next-intl'
import {
  StyledFooter,
  FooterInner,
  FooterBrand,
  FooterNavList,
  FooterNavLink,
  FooterCopyright,
} from './Footer.styles'

export default function Footer() {
  const t = useTranslations('footer')

  const FOOTER_LINKS = [
    { label: t('shop'), href: '/shop' },
    { label: t('about'), href: '/about' },
    { label: t('blog'), href: '/blog' },
    { label: t('whereToBuy'), href: '/where-to-buy' },
    { label: t('contact'), href: '/contact' },
  ]

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
          {t('rights', { year: new Date().getFullYear() })}
        </FooterCopyright>
      </FooterInner>
    </StyledFooter>
  )
}
