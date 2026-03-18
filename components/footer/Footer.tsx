'use client'

import { useTranslations } from 'next-intl'
import type { Navigation } from '@/lib/cms'
import {
  StyledFooter,
  FooterInner,
  FooterBrand,
  FooterNavList,
  FooterNavLink,
  FooterCopyright,
} from './Footer.styles'

interface Props {
  navigation: Navigation
}

export default function Footer({ navigation }: Props) {
  const t = useTranslations('footer')

  return (
    <StyledFooter>
      <FooterInner>
        <FooterBrand href="/">The Valley</FooterBrand>
        <nav aria-label="Footer navigation">
          <FooterNavList>
            {navigation.footer.map((link) => (
              <li key={link.id}>
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
