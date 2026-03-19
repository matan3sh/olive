import { Suspense } from 'react'
import { getProducts, getNavigation, type Locale } from '@/lib/cms'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ShopPage from '@/components/shop'

export default async function ShopRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale

  const [products, navigation] = await Promise.all([
    getProducts(loc),
    getNavigation(loc),
  ])

  return (
    <>
      <Header navigation={navigation} />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f0ece4' }} />}>
        <ShopPage products={products} />
      </Suspense>
      <Footer navigation={navigation} />
    </>
  )
}
