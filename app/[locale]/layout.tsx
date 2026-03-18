import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import StyledComponentsRegistry from '@/lib/styled-registry'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Providers from '../providers'
import LocaleAttributes from './locale-attributes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <>
      <LocaleAttributes locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <StyledComponentsRegistry>
          <AntdRegistry>
            <Providers>
              {children}
            </Providers>
          </AntdRegistry>
        </StyledComponentsRegistry>
      </NextIntlClientProvider>
    </>
  )
}
