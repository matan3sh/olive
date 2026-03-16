import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Where To Buy', href: '/where-to-buy' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #D7D7D7',
        padding: '3rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#11260C',
            textTransform: 'uppercase' as const,
          }}
        >
          The Valley
        </Link>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap' as const,
              justifyContent: 'center',
              gap: '1.5rem 2rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 300,
            color: '#6b7280',
          }}
        >
          &copy; {new Date().getFullYear()} The Valley Olive Oil. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
