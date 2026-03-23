import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const config = {
  // Match all paths EXCEPT:
  //   /api/*        — API routes (must not be locale-prefixed)
  //   /_next/*      — Next.js internals
  //   /studio/*     — Sanity Studio (embedded at /studio)
  //   files with extensions (images, fonts, etc.)
  matcher: ['/((?!api|_next|studio|[^?]*\\.[^?/]+).*)'],
}
