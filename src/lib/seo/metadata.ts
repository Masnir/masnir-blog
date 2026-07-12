import type { Metadata } from 'next';
import { siteConfig } from '@/content/config/site';
import type { PostMeta } from '@/types';

/** Absolute URL from a site-relative path. */
export function absoluteUrl(pathname = ''): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

/** URL for the dynamic OG image route. */
export function ogImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set('subtitle', subtitle);
  return absoluteUrl(`/api/og?${params.toString()}`);
}

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

/** Build Next.js Metadata for a generic page. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image,
  noindex = false,
}: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.title}` : siteConfig.title;
  const url = absoluteUrl(path);
  const ogImage = image ?? ogImageUrl(title ?? siteConfig.title, siteConfig.tagline);

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: siteConfig.social.twitter,
      images: [ogImage],
    },
  };
}

/** Build Next.js Metadata for an article. */
export function buildArticleMetadata(post: PostMeta, authorName: string): Metadata {
  const seoTitle = post.title;
  const description = post.excerpt || siteConfig.description;
  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const ogImage = post.coverImage
    ? absoluteUrl(post.coverImage)
    : ogImageUrl(post.title, post.subtitle);

  return {
    title: `${seoTitle} — ${siteConfig.title}`,
    description,
    authors: [{ name: authorName }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description,
      url,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [authorName],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description,
      site: siteConfig.social.twitter,
      images: [ogImage],
    },
  };
}
