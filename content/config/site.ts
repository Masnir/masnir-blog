/**
 * Site-wide configuration. Single place for brand strings, nav, socials, and
 * feature flags. Imported across metadata, layout, footer, and SEO helpers.
 */

export const siteConfig = {
  name: 'Masnir',
  title: 'Masnir Blog',
  tagline: 'Cybersecurity & AI, engineered for the real world.',
  description:
    'In-depth cybersecurity and AI security research, tutorials, and analysis from Masnir — covering cloud security, DevSecOps, Kubernetes, threat intelligence, zero trust, and automotive security.',
  // Resolved from env in lib/seo; this is the fallback/default.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://blog.masnir.site',
  locale: 'en_US',
  organization: {
    name: 'Masnir',
    url: 'https://masnir.site',
    logo: '/images/masnir-logo.png',
  },
  social: {
    twitter: '@masnir',
    twitterUrl: 'https://twitter.com/masnir',
    github: 'https://github.com/Masnir',
    linkedin: 'https://www.linkedin.com/company/masnir',
  },
  // Primary navigation (header).
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Categories', href: '/categories' },
    { label: 'Tags', href: '/tags' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  // Feature flags — architecture stays ready even when disabled.
  features: {
    comments: process.env.NEXT_PUBLIC_COMMENTS_ENABLED === 'true',
    newsletter: true,
    search: true,
  },
  postsPerPage: 9,
} as const;

export type SiteConfig = typeof siteConfig;
