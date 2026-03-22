import { getTranslations } from 'next-intl/server'
import { getWhoWeAreContent, getNavigation, type Locale } from '@/lib/cms'
import Header from '@/components/header'
import WhoWeArePage from '@/components/who-we-are'
import Footer from '@/components/footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'whoWeAre' })
  return { title: t('pageTitle'), description: t('pageDescription') }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale

  const [content, navigation] = await Promise.all([
    getWhoWeAreContent(loc),
    getNavigation(loc),
  ])

  return (
    <>
      <Header navigation={navigation} />
      <main>
        <WhoWeArePage content={content} locale={locale} />
      </main>
      <Footer navigation={navigation} />
    </>
  )
}
