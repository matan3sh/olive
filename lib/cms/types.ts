export type Locale = 'en' | 'he'

export interface LocalizedString {
  en: string
  he: string
}

export interface ProductVariant {
  label: string
  price: string
  stock: 'in_stock' | 'few_left' | 'out_of_stock'
}

export interface Product {
  id: string
  active: boolean
  featured: boolean
  variants: ProductVariant[]
  category?: string
  image: string
  fit: 'cover' | 'contain'
  acidity: string
  // Localized fields (resolved at query time)
  title: string
  subtitle: string
  description: string
  origin: string
  harvest: string
}

export interface RawProduct extends Omit<Product, 'title' | 'subtitle' | 'description' | 'origin' | 'harvest'> {
  title: LocalizedString
  subtitle: LocalizedString
  description: LocalizedString
  origin: LocalizedString
  harvest: LocalizedString
}

export interface Testimonial {
  id: string
  quote: string
  author: string
}

export interface RawTestimonial {
  id: string
  quote: LocalizedString
  author: LocalizedString
}

export interface AboutStat {
  id: string
  num: string
  label: string
  dark: boolean
}

export interface RawAboutStat {
  id: string
  num: string
  label: LocalizedString
  dark: boolean
}

export interface AboutContent {
  tag: string
  heading: string
  body: string
  image1: string
  image2: string
  stats: AboutStat[]
}

export interface RawAboutContent {
  tag: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  image1: string
  image2: string
  stats: RawAboutStat[]
}

export interface HeroContent {
  tag: string
  title: string
  subtitle: string
  cta: string
  sideLabel: string
  backgroundImage: string
  video: string
}

export interface RawHeroContent {
  tag: LocalizedString
  title: LocalizedString
  subtitle: LocalizedString
  cta: LocalizedString
  sideLabel: LocalizedString
  backgroundImage: string
  video: string
}

export interface NavItem {
  id: string
  href: string
  label: string
}

export interface RawNavItem {
  id: string
  href: string
  label: LocalizedString
}

export interface Navigation {
  header: NavItem[]
  footer: NavItem[]
}

// ─── Who We Are ───────────────────────────────────────────────────────────────

export interface WhoWeAreChapter {
  _key: string
  label: string
  heading: string
  body: string
  image: string
  side: 'left' | 'right'
}

export interface WhoWeAreContent {
  heroQuote: string
  heroSubtitle: string
  chapters: WhoWeAreChapter[]
  stats: AboutStat[]       // reuses existing AboutStat
  ctaEyebrow: string
  ctaHeading: string
  ctaLabel: string
}

export interface RawWhoWeAreChapter {
  _key: string
  label: LocalizedString
  heading: LocalizedString
  body: LocalizedString
  image: string            // resolved via GROQ asset->url
  side: 'left' | 'right'
}

export interface RawWhoWeAreContent {
  heroQuote: LocalizedString
  heroSubtitle: LocalizedString
  chapters: RawWhoWeAreChapter[]
  stats: RawAboutStat[]
  ctaEyebrow: LocalizedString
  ctaHeading: LocalizedString
  ctaLabel: LocalizedString
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export interface Review {
  _id: string
  product: string
  author: string
  rating: number
  quote: string
  date: string
}

export type RawReview = Review  // no localization — passthrough

// ─── Shipping ─────────────────────────────────────────────────────────────────

export interface ShippingZone {
  label: string
  price: string
  estimatedDays: string
  freeThreshold: string
}

export interface ShippingSettings {
  zones: ShippingZone[]
  notes: string
}

export interface RawShippingSettings {
  zones: ShippingZone[]
  notes: LocalizedString
}
