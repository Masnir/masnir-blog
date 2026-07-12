import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/config/site';

/** robots.txt — allow all, disallow the admin panel and API, point to sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
