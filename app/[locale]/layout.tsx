import type { Metadata } from 'next'
import { Inter, Assistant } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import StyledComponentsRegistry from '@/lib/styled-registry'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import Providers from '../providers'
import '../globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const assistant = Assistant({
  variable: '--font-heebo',
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

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
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${assistant.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <StyledComponentsRegistry>
            <AntdRegistry>
              <Providers>
                {children}
              </Providers>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
