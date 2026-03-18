import { notFound } from 'next/navigation'
import { getProducts, getProductById, getNavigation, type Locale } from '@/lib/cms'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from '@/components/ProductDetail'

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ id?: string }>
}) {
  const { locale } = await params
  const { id = 'robust' } = await searchParams
  const loc = locale as Locale

  const [product, allProducts, navigation] = await Promise.all([
    getProductById(id, loc),
    getProducts(loc),
    getNavigation(loc),
  ])

  const currentProduct = product ?? allProducts[0]
  if (!currentProduct) notFound()

  return (
    <>
      <Header navigation={navigation} />
      <ProductDetail product={currentProduct} allProducts={allProducts} />
      <Footer navigation={navigation} />
    </>
  )
}
