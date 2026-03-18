'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { LangBtn, LangDivider, SwitcherWrapper } from './LanguageSwitcher.styles'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <SwitcherWrapper>
      <LangBtn
        $active={locale === 'en'}
        onClick={() => switchLocale('en')}
        aria-label="Switch to English"
      >
        EN
      </LangBtn>
      <LangDivider>|</LangDivider>
      <LangBtn
        $active={locale === 'he'}
        onClick={() => switchLocale('he')}
        aria-label="Switch to Hebrew"
      >
        HE
      </LangBtn>
    </SwitcherWrapper>
  )
}
