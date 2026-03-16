import Image from 'next/image'

export default function AboutSection() {
  return (
    <section
      aria-label="About our olives"
      style={{ backgroundColor: '#ffffff', width: '100%', overflow: 'hidden' }}
    >
      {/*
        Figma layout (1440px frame):
        - Image 1 (463×334): left=47px, top=0
        - Image 2 (428×295): left=962px (66.8%), top=334px
        - Text (484×356):    left=478px (33.2%), top=142px
        - Section height:    629px
      */}

      {/* ── DESKTOP: diagonal editorial layout ─────────────────── */}
      <div
        className="about-desktop"
        style={{
          position: 'relative',
          width: '100%',
          height: '629px',
        }}
      >
        {/* Image 1 — large, top-left */}
        <div style={{
          position: 'absolute',
          left: '3.26%',   /* 47/1440 */
          top: 0,
          width: '32.15%', /* 463/1440 */
          height: '334px',
          overflow: 'hidden',
        }}>
          <Image
            src="/figma/about-1.jpg"
            alt="Fresh olives in a bowl"
            fill
            sizes="32vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Image 2 — smaller, bottom-right */}
        <div style={{
          position: 'absolute',
          left: '66.8%',   /* 962/1440 */
          top: '334px',
          width: '29.72%', /* 428/1440 */
          height: '295px',
          overflow: 'hidden',
        }}>
          <Image
            src="/figma/about-2.jpg"
            alt="Olive oil being poured"
            fill
            sizes="30vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Text block — center, 142px from top */}
        <div style={{
          position: 'absolute',
          left: '33.2%',   /* 478/1440 */
          top: '142px',
          width: '33.6%',  /* 484/1440 */
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '45px',
            fontWeight: 400,
            color: '#11260c',
            lineHeight: '56px',
            marginBottom: '24px',
          }}>
            IT&apos;S ALL ABOUT THOSE OLIVES
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 300,
            color: '#11260c',
            lineHeight: '28px',
            opacity: 0.80,
          }}>
            Extra Virgin Olive Oil is simply the juice of fantastically
            healthy olives. And that&apos;s all it is—so the quality of
            the oil depends entirely on the quality of the olives.
          </p>
        </div>
      </div>

      {/* ── MOBILE: stacked layout ──────────────────────────────── */}
      <div className="about-mobile" style={{ display: 'none', flexDirection: 'column', gap: '24px', padding: '48px 20px' }}>
        <div style={{ width: '100%', aspectRatio: '463/334', position: 'relative', overflow: 'hidden' }}>
          <Image src="/figma/about-1.jpg" alt="Fresh olives in a bowl" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ textAlign: 'center', padding: '0 8px' }}>
          <h2 style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(1.75rem, 7vw, 45px)', fontWeight: 400, color: '#11260c', lineHeight: 1.25, marginBottom: '20px' }}>
            IT&apos;S ALL ABOUT THOSE OLIVES
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 300, color: '#11260c', lineHeight: '28px', opacity: 0.80 }}>
            Extra Virgin Olive Oil is simply the juice of fantastically healthy olives. And that&apos;s all it is—so the quality of the oil depends entirely on the quality of the olives.
          </p>
        </div>
        <div style={{ width: '100%', aspectRatio: '428/295', position: 'relative', overflow: 'hidden' }}>
          <Image src="/figma/about-2.jpg" alt="Olive oil being poured" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-desktop { display: none !important; }
          .about-mobile  { display: flex !important; }
        }
        @media (min-width: 901px) and (max-width: 1200px) {
          .about-desktop { height: auto !important; min-height: 440px; }
        }
      `}</style>
    </section>
  )
}
