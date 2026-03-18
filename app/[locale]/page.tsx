import {
  getProducts,
  getTestimonials,
  getAboutContent,
  getHeroContent,
  getNavigation,
  type Locale,
} from '@/lib/cms'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProductsSection from '@/components/ProductsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Footer from '@/components/Footer'

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
