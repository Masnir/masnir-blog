import type { MetadataRoute } from 'next';
import { content } from '@/lib/content';
import { categories } from '@/content/config/categories';
import { absoluteUrl } from '@/lib/seo/metadata';

/** Dynamic sitemap covering static pages, posts, categories, tags, and authors. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags, authors] = await Promise.all([
    content.getAllPosts(),
    content.getAllTags(),
    content.getAllAuthors(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: absoluteUrl('/categories'), changeFrequency: 'weekly', priority: 0.6 },
    { url: absoluteUrl('/tags'), changeFrequency: 'weekly', priority: 0.5 },
    { url: absoluteUrl('/search'), changeFrequency: 'monthly', priority: 0.4 },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
    url: absoluteUrl(`/tags/${t.slug}`),
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
    url: absoluteUrl(`/author/${a.slug}`),
    changeFrequency: 'monthly',
    priority: 0.4,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes];
}
