import Image from 'next/image'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'

export default function ProductsSection() {
  return (
    <section
      aria-label="Our olive oil products"
      style={{ backgroundColor: '#e9eee2', width: '100%' }}
    >
      {/* Outer: max 1440px centred, 149px padding each side at desktop */}
      <div className="products-outer" style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '100px 149px',
      }}>

        {/* ── Heading row ───────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '79px',   /* heading bottom (160px) → cards top (239px) */
        }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(1.75rem, 3.2vw, 45px)',
            fontWeight: 400,
            lineHeight: '60px',
            color: '#11260c',
            margin: 0,
          }}>
            Our Olive Oil
          </h2>

          <Link href="/shop" style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '1px',
            color: '#11260c',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            SEE ALL PRODUCTS
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
              <path d="M0 4h10M7 1l3 3-3 3" stroke="#11260c" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* ── Product grid ──────────────────────────────────────── */}
        <div className="products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 268px))',
          gap: '21px',
        }}>
          {PRODUCTS.map((p) => (
            <article key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Image — 268×379, white bg */}
              <Link href={`/product?id=${p.id}`} style={{ display: 'block', lineHeight: 0, marginBottom: '20px' }}>
                <div style={{
                  width: '268px',
                  height: '379px',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="268px"
                    style={{ objectFit: p.fit }}
                  />
                </div>
              </Link>

              {/* Title — 16px w400 uppercase, lh=24px */}
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#11260c',
                textTransform: 'uppercase',
                marginBottom: '0',
              }}>
                {p.title}
              </p>

              {/* Price — 14px w300, ls=1px, lh=26px */}
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: '26px',
                letterSpacing: '1px',
                color: '#11260c',
              }}>
                FROM {p.price}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          .products-outer { padding: 80px 60px !important; }
          .products-grid  { grid-template-columns: repeat(4, 1fr) !important; }
          .products-grid article > a > div,
          .products-grid article > a + p ~ p { width: 100% !important; }
          .products-grid article > a > div  { width: 100% !important; height: auto !important; aspect-ratio: 268/379; }
        }
        @media (max-width: 900px) {
          .products-outer { padding: 60px 32px !important; }
          .products-grid  {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .products-grid article > a > div {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 268/379;
          }
        }
        @media (max-width: 480px) {
          .products-outer { padding: 48px 20px !important; }
          .products-grid  { gap: 12px !important; }
        }
      `}</style>
    </section>
  )
}
