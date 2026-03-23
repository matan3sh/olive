import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en',
})

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/studio')) return
  if (request.nextUrl.pathname.startsWith('/api')) return
  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
