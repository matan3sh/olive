import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Valley Olive Oil — Jezreel Valley Select Extra Virgin',
  description:
    'Premium extra virgin olive oil from the Jezreel Valley. Pure, fresh, and unfiltered.',
  openGraph: {
    title: 'The Valley Olive Oil',
    description: 'Jezreel Valley Select Extra Virgin Olive Oil — pure, fresh, unfiltered.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
