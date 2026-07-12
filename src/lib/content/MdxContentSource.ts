import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type {
  Author,
  Category,
  Post,
  PostFrontmatter,
  PostMeta,
  SortOrder,
  TagWithCount,
} from '@/types';
import { categories, getCategory } from '@/content/config/categories';
import { extractToc } from '@/lib/mdx/toc';
import { humanizeTag, slugify } from '@/lib/utils/format';
import { postToMeta } from './postToMeta';
import type { ContentSource } from './ContentSource';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');
const IS_PROD = process.env.NODE_ENV === 'production';

/**
 * Git/MDX-backed ContentSource. Reads `content/posts/*.mdx` at build time.
 *
 * Results are memoized per process — during a build we parse each file once.
 * All heavy lifting (front-matter, reading time, TOC) happens here so pages
 * receive fully-resolved domain objects.
 */
class MdxContentSource implements ContentSource {
  private postsCache: Post[] | null = null;
  private authorsCache: Author[] | null = null;

  // ── internal loaders ─────────────────────────────────────────

  private readAllPosts(): Post[] {
    if (this.postsCache) return this.postsCache;

    if (!fs.existsSync(POSTS_DIR)) {
      this.postsCache = [];
      return this.postsCache;
    }

    // Only .md/.mdx files; files starting with "_" (e.g. _TEMPLATE.mdx) and
    // README.md are authoring helpers, not articles, so they're skipped.
    const files = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_') && f.toLowerCase() !== 'readme.md');

    const posts = files
      .map((file) => this.parsePost(file))
      .filter((p): p is Post => p !== null)
      // Hide drafts in production; show them in dev for preview.
      .filter((p) => (IS_PROD ? !p.frontmatter.draft : true))
      .sort(
        (a, b) =>
          new Date(b.frontmatter.publishedAt).getTime() -
          new Date(a.frontmatter.publishedAt).getTime(),
      );

    this.postsCache = posts;
    return posts;
  }

  private parsePost(file: string): Post | null {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const fm = data as Partial<PostFrontmatter>;

    // Minimal validation — a malformed post should fail loudly at build.
    if (!fm.title || !fm.publishedAt || !fm.category || !fm.author) {
      if (!IS_PROD) {
        console.warn(`[content] Skipping "${file}" — missing required frontmatter.`);
      }
      return null;
    }

    const slug = file.replace(/\.mdx?$/, '');
    const stats = readingTime(content);

    const frontmatter: PostFrontmatter = {
      title: fm.title,
      subtitle: fm.subtitle,
      excerpt: fm.excerpt ?? '',
      category: fm.category,
      tags: (fm.tags ?? []).map((t) => slugify(String(t))),
      author: fm.author,
      coverImage: fm.coverImage,
      coverImageAlt: fm.coverImageAlt,
      publishedAt: new Date(fm.publishedAt).toISOString(),
      updatedAt: fm.updatedAt ? new Date(fm.updatedAt).toISOString() : undefined,
      draft: fm.draft ?? false,
      featured: fm.featured ?? false,
      popular: fm.popular ?? false,
      seo: fm.seo,
    };

    return {
      slug,
      frontmatter,
      content,
      readingTimeMinutes: stats.minutes,
      wordCount: stats.words,
      toc: extractToc(content),
    };
  }

  private toMeta(post: Post): PostMeta {
    return postToMeta(post);
  }

  private readAllAuthors(): Author[] {
    if (this.authorsCache) return this.authorsCache;

    if (!fs.existsSync(AUTHORS_DIR)) {
      this.authorsCache = [];
      return this.authorsCache;
    }

    const files = fs.readdirSync(AUTHORS_DIR).filter((f) => /\.(md|mdx|json)$/.test(f));
    this.authorsCache = files.map((file) => {
      const raw = fs.readFileSync(path.join(AUTHORS_DIR, file), 'utf8');
      const slug = file.replace(/\.(md|mdx|json)$/, '');
      if (file.endsWith('.json')) {
        return { slug, ...(JSON.parse(raw) as Omit<Author, 'slug'>) };
      }
      const { data, content } = matter(raw);
      return {
        slug,
        name: data.name ?? slug,
        role: data.role,
        bio: (data.bio as string) ?? content.trim(),
        avatar: data.avatar,
        links: data.links,
      } satisfies Author;
    });
    return this.authorsCache;
  }

  // ── public API ───────────────────────────────────────────────

  async getAllPosts(): Promise<PostMeta[]> {
    return this.readAllPosts().map((p) => this.toMeta(p));
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    return this.readAllPosts().find((p) => p.slug === slug) ?? null;
  }

  async getAllSlugs(): Promise<string[]> {
    return this.readAllPosts().map((p) => p.slug);
  }

  async getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
    return this.readAllPosts()
      .filter((p) => p.frontmatter.category === categorySlug)
      .map((p) => this.toMeta(p));
  }

  async getPostsByTag(tagSlug: string): Promise<PostMeta[]> {
    return this.readAllPosts()
      .filter((p) => p.frontmatter.tags.includes(tagSlug))
      .map((p) => this.toMeta(p));
  }

  async getAllTags(): Promise<TagWithCount[]> {
    const counts = new Map<string, number>();
    for (const post of this.readAllPosts()) {
      for (const tag of post.frontmatter.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([slug, count]) => ({ slug, name: humanizeTag(slug), count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }

  async getUsedCategories(): Promise<Category[]> {
    const used = new Set(this.readAllPosts().map((p) => p.frontmatter.category));
    return categories.filter((c) => used.has(c.slug));
  }

  async getFeaturedPosts(limit?: number): Promise<PostMeta[]> {
    const list = this.readAllPosts()
      .filter((p) => p.frontmatter.featured)
      .map((p) => this.toMeta(p));
    return limit ? list.slice(0, limit) : list;
  }

  async getPopularPosts(limit?: number): Promise<PostMeta[]> {
    const list = this.readAllPosts()
      .filter((p) => p.frontmatter.popular)
      .map((p) => this.toMeta(p));
    return limit ? list.slice(0, limit) : list;
  }

  async getLatestPosts(limit = 6): Promise<PostMeta[]> {
    return this.readAllPosts()
      .slice(0, limit)
      .map((p) => this.toMeta(p));
  }

  async getRelatedPosts(slug: string, limit = 3): Promise<PostMeta[]> {
    const all = this.readAllPosts();
    const source = all.find((p) => p.slug === slug);
    if (!source) return [];

    const srcTags = new Set(source.frontmatter.tags);

    return all
      .filter((p) => p.slug !== slug)
      .map((p) => {
        let score = 0;
        if (p.frontmatter.category === source.frontmatter.category) score += 3;
        score += p.frontmatter.tags.filter((t) => srcTags.has(t)).length;
        return { post: p, score };
      })
      .filter((x) => x.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          new Date(b.post.frontmatter.publishedAt).getTime() -
            new Date(a.post.frontmatter.publishedAt).getTime(),
      )
      .slice(0, limit)
      .map((x) => this.toMeta(x.post));
  }

  async getAdjacentPosts(slug: string): Promise<{ prev: PostMeta | null; next: PostMeta | null }> {
    const all = this.readAllPosts();
    const idx = all.findIndex((p) => p.slug === slug);
    if (idx === -1) return { prev: null, next: null };
    // Newest-first ordering: "next" (older) is idx+1, "prev" (newer) is idx-1.
    const newer = idx > 0 ? this.toMeta(all[idx - 1]!) : null;
    const older = idx < all.length - 1 ? this.toMeta(all[idx + 1]!) : null;
    return { prev: newer, next: older };
  }

  async getAuthor(slug: string): Promise<Author | null> {
    return this.readAllAuthors().find((a) => a.slug === slug) ?? null;
  }

  async getAllAuthors(): Promise<Author[]> {
    return this.readAllAuthors();
  }

  sortPosts(posts: PostMeta[], order: SortOrder): PostMeta[] {
    const copy = [...posts];
    switch (order) {
      case 'oldest':
        return copy.sort(
          (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
        );
      case 'popular':
        return copy.sort((a, b) => Number(b.popular) - Number(a.popular));
      case 'reading-time':
        return copy.sort((a, b) => a.readingTimeMinutes - b.readingTimeMinutes);
      case 'newest':
      default:
        return copy.sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        );
    }
  }
}

export { MdxContentSource };
export { getCategory };
