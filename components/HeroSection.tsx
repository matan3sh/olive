import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      aria-label="Hero"
      style={{
        position: 'relative',
        width: '100%',
        /* Desktop header = 72px row1 + 1px divider + 68px row2 = 141px */
        height: 'calc(100vh - 141px)',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image — olive branch photo */}
      <Image
        src="/figma/hero-bg.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        sizes="100vw"
      />

      {/* Gradient overlay matching Figma: ~40% opacity, greenish fade top-to-bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(233,238,226,0.80) 0%, rgba(233,238,226,0.55) 50%, rgba(207,211,197,0.20) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content — centered, above overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '2rem 1.5rem',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* H1 — comes FIRST per Figma layout */}
        <h1
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(2rem, 4.5vw, 65px)',
            fontWeight: 400,
            textTransform: 'uppercase',
            color: '#11260c',
            lineHeight: '1.23',
            letterSpacing: '0',
            marginBottom: '20px',
          }}
        >
          Jezreel Valley Select
          <br />
          Extra Virgin Olive Oil
        </h1>

        {/* Subtitle — below H1 per Figma */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '24px',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#060e05',
            lineHeight: '32px',
            letterSpacing: '3px',
            opacity: 0.60,
            marginBottom: '44px',
          }}
        >
          The Valley Olive Oil
        </p>

        {/* Shop Now CTA */}
        <Link
          href="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '200px',
            height: '66px',
            backgroundColor: '#1f231a',
            color: '#ffffff',
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '1px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            borderRadius: 0,
          }}
        >
          Shop now
        </Link>
      </div>
    </section>
  )
}
