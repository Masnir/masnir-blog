import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers/Providers';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import { siteConfig } from '@/content/config/site';

// Self-hosted (Next optimizes/subsets) fonts exposed as CSS vars for Tailwind.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({ path: '/' }),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.title}`,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1a' },
  ],
  colorScheme: 'dark light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-fg">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
