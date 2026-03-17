'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import styled from 'styled-components'

const SwitcherWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textNav};
`

const LangBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 4px;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 600 : 300)};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textNav};
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

const LangDivider = styled.span`
  opacity: 0.3;
  font-weight: 300;
`

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
