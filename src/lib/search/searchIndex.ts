import 'server-only';
import type { SearchDoc } from '@/types';
import { content } from '@/lib/content';

/**
 * Build the search index from all published posts. Called at build time by the
 * /search page (embedded) and could also be emitted as a static JSON file.
 * Kept intentionally small (title/excerpt/tags/category) for fast client search.
 */
export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const posts = await content.getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    publishedAt: p.publishedAt,
    readingTimeMinutes: p.readingTimeMinutes,
  }));
}
