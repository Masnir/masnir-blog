/**
 * Core content domain types.
 *
 * These describe the *shape* of content regardless of where it comes from
 * (currently MDX files on disk; potentially a database later). Pages and
 * components depend only on these types, never on the storage mechanism —
 * see `lib/content/ContentSource.ts`.
 */

/** Raw frontmatter as authored in an MDX file (before enrichment). */
export interface PostFrontmatter {
  title: string;
  subtitle?: string;
  excerpt: string;
  /** Category slug (must exist in content/config/categories). */
  category: string;
  tags: string[];
  /** Author slug (must exist in content/authors). */
  author: string;
  coverImage?: string;
  coverImageAlt?: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  draft?: boolean;
  featured?: boolean;
  popular?: boolean;
  /** Per-post SEO overrides. */
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
    canonical?: string;
    noindex?: boolean;
  };
}

/** A single heading extracted for the table of contents. */
export interface TocItem {
  id: string;
  title: string;
  level: number; // 2 | 3 (h2/h3)
}

/** Fully-resolved post: frontmatter + derived fields + body. */
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Raw MDX body (compiled at render time). */
  content: string;
  readingTimeMinutes: number;
  wordCount: number;
  toc: TocItem[];
}

/** Lightweight post shape for listings/cards (no body). */
export interface PostMeta {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  coverImage?: string;
  coverImageAlt?: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  popular: boolean;
  readingTimeMinutes: number;
}

export interface Author {
  slug: string;
  name: string;
  role?: string;
  bio: string;
  avatar?: string;
  links?: {
    website?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

/** Tag with usage count, derived from posts. */
export interface TagWithCount {
  slug: string;
  name: string;
  count: number;
}

/** One record in the client-side search index. */
export interface SearchDoc {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
}

export type SortOrder = 'newest' | 'oldest' | 'popular' | 'reading-time';
