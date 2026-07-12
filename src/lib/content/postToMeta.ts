import type { Post, PostMeta } from '@/types';

/** Derive the lightweight PostMeta shape from a fully-resolved Post. */
export function postToMeta(post: Post): PostMeta {
  const fm = post.frontmatter;
  return {
    slug: post.slug,
    title: fm.title,
    subtitle: fm.subtitle,
    excerpt: fm.excerpt,
    category: fm.category,
    tags: fm.tags,
    author: fm.author,
    coverImage: fm.coverImage,
    coverImageAlt: fm.coverImageAlt,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    featured: fm.featured ?? false,
    popular: fm.popular ?? false,
    readingTimeMinutes: post.readingTimeMinutes,
  };
}
