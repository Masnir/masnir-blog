import type { Author, Category, Post, PostMeta, SortOrder, TagWithCount } from '@/types';

/**
 * ContentSource — the storage-agnostic contract every page/component reads from.
 *
 * The whole app depends on THIS interface, never on the filesystem or a DB
 * directly. Today the only implementation is `MdxContentSource` (reads MDX from
 * the repo). To move to Supabase/Postgres later, implement this interface with a
 * new adapter and swap the export in `index.ts` — no page code changes.
 *
 * All methods are async so a future network-backed adapter fits without changing
 * call sites.
 */
export interface ContentSource {
  /** All published posts (drafts excluded in production), newest-first. */
  getAllPosts(): Promise<PostMeta[]>;

  /** Full post (frontmatter + body + derived fields) by slug, or null. */
  getPostBySlug(slug: string): Promise<Post | null>;

  /** Slugs of all published posts — for generateStaticParams. */
  getAllSlugs(): Promise<string[]>;

  /** Posts within a category slug, newest-first. */
  getPostsByCategory(categorySlug: string): Promise<PostMeta[]>;

  /** Posts carrying a tag slug, newest-first. */
  getPostsByTag(tagSlug: string): Promise<PostMeta[]>;

  /** Distinct tags with usage counts, most-used first. */
  getAllTags(): Promise<TagWithCount[]>;

  /** Categories that actually have at least one published post. */
  getUsedCategories(): Promise<Category[]>;

  /** Featured posts (frontmatter.featured), newest-first, optionally limited. */
  getFeaturedPosts(limit?: number): Promise<PostMeta[]>;

  /** Popular posts (frontmatter.popular), newest-first, optionally limited. */
  getPopularPosts(limit?: number): Promise<PostMeta[]>;

  /** Latest posts, limited. */
  getLatestPosts(limit?: number): Promise<PostMeta[]>;

  /**
   * Related posts for a given slug — scored by shared category/tags.
   * Excludes the source post itself.
   */
  getRelatedPosts(slug: string, limit?: number): Promise<PostMeta[]>;

  /** Adjacent posts in the global newest-first ordering. */
  getAdjacentPosts(slug: string): Promise<{ prev: PostMeta | null; next: PostMeta | null }>;

  /** An author profile by slug, or null. */
  getAuthor(slug: string): Promise<Author | null>;

  /** All authors. */
  getAllAuthors(): Promise<Author[]>;

  /** Sort helper shared by listing/search UIs. */
  sortPosts(posts: PostMeta[], order: SortOrder): PostMeta[];
}
