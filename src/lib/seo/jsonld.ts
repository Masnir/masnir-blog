import { siteConfig } from '@/content/config/site';
import type { Author, PostMeta } from '@/types';
import { getCategoryName } from '@/content/config/categories';
import { absoluteUrl, ogImageUrl } from './metadata';

/**
 * JSON-LD structured data builders. Each returns a plain object that a page
 * renders inside a <script type="application/ld+json">. Improves rich results
 * in search and social.
 */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: absoluteUrl(siteConfig.organization.logo),
    sameAs: [siteConfig.social.twitterUrl, siteConfig.social.github, siteConfig.social.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleJsonLd(post: PostMeta, author: Author | null) {
  const image = post.coverImage
    ? absoluteUrl(post.coverImage)
    : ogImageUrl(post.title, post.subtitle);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: author
      ? { '@type': 'Person', name: author.name, url: absoluteUrl(`/author/${author.slug}`) }
      : { '@type': 'Organization', name: siteConfig.organization.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl(siteConfig.organization.logo) },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${post.slug}`) },
    articleSection: getCategoryName(post.category),
    keywords: post.tags.join(', '),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
