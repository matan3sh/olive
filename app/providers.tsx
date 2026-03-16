'use client'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}
