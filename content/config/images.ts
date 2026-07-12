/**
 * Central registry of decorative site imagery (NOT blog-post content images).
 *
 * Every non-article image the UI uses is referenced through this one file, so
 * migrating to object storage (Cloudflare R2 at media.masnir.site) later is a
 * one-place change: swap these paths to the R2 URLs and nothing else moves.
 *
 * Served from Cloudflare R2 (media.masnir.site). To move or rename, change the
 * URLs here only — every usage updates automatically.
 */
export const siteImages = {
  /** Homepage hero background — dark cyan geometric cubes (cyber/AI). */
  hero: 'https://media.masnir.site/blog/site/image4.jpg',
  /** About page banner — CCTV cameras (security). */
  about: 'https://media.masnir.site/blog/site/image3.jpg',
  /** Newsletter section background — aspirational sunset. */
  newsletter: 'https://media.masnir.site/blog/site/image1.jpg',
  /** Contact page banner — "Dream Big". */
  contact: 'https://media.masnir.site/blog/site/image2.jpg',
} as const;

export type SiteImageKey = keyof typeof siteImages;
