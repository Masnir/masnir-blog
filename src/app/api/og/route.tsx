import { ImageResponse } from 'next/og';
import { siteConfig } from '@/content/config/site';

export const runtime = 'edge';

/**
 * Dynamic Open Graph image generator (1200×630).
 * Usage: /api/og?title=...&subtitle=...
 * Uses the brand accent so social cards match the site's identity.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') ?? siteConfig.title).slice(0, 120);
  const subtitle = (searchParams.get('subtitle') ?? siteConfig.tagline).slice(0, 160);

  // Cyber-cyan accent (kept in sync with tokens.css dark accent).
  const accent = '#22d3ee';
  const bg = '#0a0f1a';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: bg,
        padding: '80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: 300,
          width: 700,
          height: 500,
          background: accent,
          opacity: 0.18,
          filter: 'blur(120px)',
          borderRadius: '9999px',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: 'rgba(34,211,238,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}
        >
          🛡
        </div>
        <div style={{ color: 'white', fontSize: 32, fontWeight: 700 }}>
          {siteConfig.name}
          <span style={{ color: accent }}>.</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ color: '#9ca3af', fontSize: 30, maxWidth: 900 }}>{subtitle}</div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 40, height: 4, background: accent, borderRadius: 4 }} />
        <div style={{ color: '#6b7280', fontSize: 24 }}>blog.masnir.site</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
