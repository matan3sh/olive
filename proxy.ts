import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'he'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
