import {
  getProducts,
  getTestimonials,
  getAboutContent,
  getHeroContent,
  getNavigation,
  type Locale,
} from '@/lib/cms'
import Header from '@/components/header'
import HeroSection from '@/components/hero'
import AboutSection from '@/components/about'
import ProductsSection from '@/components/products'
import TestimonialsSection from '@/components/testimonials'
import Footer from '@/components/footer'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale

  const [products, testimonials, about, hero, navigation] = await Promise.all([
    getProducts(loc),
    getTestimonials(loc),
    getAboutContent(loc),
    getHeroContent(loc),
    getNavigation(loc),
  ])

  return (
    <>
      <Header navigation={navigation} />
      <main>
        <HeroSection hero={hero} />
        <AboutSection about={about} />
        <ProductsSection products={products} />
        <TestimonialsSection testimonials={testimonials} />
      </main>
      <Footer navigation={navigation} />
    </>
  )
}
