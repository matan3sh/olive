'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { PRODUCTS } from '@/lib/products'

function ProductDetail() {
  const params = useSearchParams()
  const id = params.get('id') ?? 'robust'
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]

  return (
    <main style={{ backgroundColor: '#ffffff' }}>
      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 149px',
        borderBottom: '1px solid #e9eee2',
      }}>
        <nav style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 300,
          color: '#11260c',
          opacity: 0.6,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
          <span>/</span>
          <span style={{ opacity: 1, color: '#11260c', fontWeight: 400 }}>{product.subtitle}</span>
        </nav>
      </div>

      {/* ── Main split layout ───────────────────────────────────── */}
      <div className="product-split" style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '60px 149px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left — product image */}
        <div style={{
          backgroundColor: '#f8f9f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: '1 / 1.2',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: product.fit, padding: '40px' }}
            priority
          />
        </div>

        {/* Right — product info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '12px' }}>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(1.5rem, 2.5vw, 36px)',
            fontWeight: 400,
            color: '#11260c',
            lineHeight: 1.3,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            {product.title}
          </h1>

          {/* Price */}
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '22px',
            fontWeight: 400,
            color: '#11260c',
            letterSpacing: '0.5px',
          }}>
            FROM {product.price}
          </p>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid #e9eee2', margin: 0 }} />

          {/* Size selector */}
          <div>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#11260c',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Size
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.sizes.map((size, i) => (
                <button
                  key={size}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: i === 0 ? 600 : 300,
                    color: '#11260c',
                    border: i === 0 ? '1.5px solid #11260c' : '1px solid rgba(17,38,12,0.25)',
                    backgroundColor: 'transparent',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    letterSpacing: '0.5px',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 300,
            color: '#11260c',
            lineHeight: '26px',
            opacity: 0.85,
          }}>
            {product.description}
          </p>

          {/* Add to Cart */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '56px',
            backgroundColor: '#1f231a',
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
          }}>
            Add to Cart
          </button>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid #e9eee2', margin: 0 }} />

          {/* Product details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Origin', value: product.origin },
              { label: 'Harvest', value: product.harvest },
              { label: 'Acidity', value: product.acidity },
              { label: 'Processing', value: 'Cold pressed' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#11260c',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  opacity: 0.5,
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#11260c',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Other products ──────────────────────────────────────── */}
      <div style={{ backgroundColor: '#e9eee2', padding: '60px 0' }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 149px',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '24px',
            fontWeight: 400,
            color: '#11260c',
            marginBottom: '40px',
            letterSpacing: '0.5px',
          }}>
            You may also like
          </h2>
          <div className="related-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '21px',
          }}>
            {PRODUCTS.filter((p) => p.id !== product.id).map((p) => (
              <Link key={p.id} href={`/product?id=${p.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  aspectRatio: '268/379',
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: '14px',
                }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="25vw"
                    style={{ objectFit: p.fit, padding: '20px' }}
                  />
                </div>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#11260c',
                  textTransform: 'uppercase',
                  lineHeight: '20px',
                  marginBottom: '4px',
                }}>
                  {p.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#11260c',
                  letterSpacing: '0.5px',
                }}>
                  FROM {p.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1280px) {
          .product-split { padding: 60px 60px 80px !important; gap: 60px !important; }
          .related-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 900px) {
          .product-split { grid-template-columns: 1fr !important; padding: 40px 32px 60px !important; gap: 40px !important; }
          .related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 480px) {
          .product-split { padding: 32px 20px 48px !important; }
        }
      `}</style>
    </main>
  )
}

export default function ProductPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <ProductDetail />
      </Suspense>
      <Footer />
    </>
  )
}
