import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/styled-registry'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Valley Olive Oil — Jezreel Valley Select Extra Virgin',
  description: 'Premium extra virgin olive oil from the Jezreel Valley. Pure, fresh, and unfiltered.',
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
      <body className={inter.variable}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <AntdRegistry>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#11260c',
                    colorText: '#11260c',
                    fontFamily: 'var(--font-inter)',
                    borderRadius: 0,
                  },
                  components: {
                    Button: {
                      primaryColor: '#ffffff',
                      colorPrimaryHover: '#1f231a',
                    },
                  },
                }}
              >
                <GlobalStyles />
                {children}
              </ConfigProvider>
            </AntdRegistry>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
