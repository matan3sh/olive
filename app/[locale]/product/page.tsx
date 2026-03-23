import { notFound } from 'next/navigation'
import {
  getProducts,
  getProductById,
  getNavigation,
  getReviewsByProduct,
  getShippingSettings,
  type Locale,
} from '@/lib/cms'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProductDetail from '@/components/product-detail'

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

  const [product, allProducts, navigation, reviews, shippingSettings] = await Promise.all([
    getProductById(id, loc),
    getProducts(loc),
    getNavigation(loc),
    getReviewsByProduct(id),
    getShippingSettings(loc),
  ])

  const currentProduct = product ?? allProducts[0]
  if (!currentProduct) notFound()

  return (
    <>
      <Header navigation={navigation} />
      <ProductDetail
        product={currentProduct}
        allProducts={allProducts}
        reviews={reviews}
        shippingSettings={shippingSettings}
      />
      <Footer navigation={navigation} />
    </>
  )
}
