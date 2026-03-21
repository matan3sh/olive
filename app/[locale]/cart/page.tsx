import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { CartPage } from '@/components/cart'
import { getNavigation, type Locale } from '@/lib/cms'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'cart' })
  return { title: t('title') }
}

export default async function CartRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale
  const navigation = await getNavigation(loc)

  return (
    <>
      <Header navigation={navigation} />
      <CartPage />
      <Footer navigation={navigation} />
    </>
  )
}
