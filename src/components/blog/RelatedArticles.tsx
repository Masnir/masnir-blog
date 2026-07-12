import { ArticleCard } from './ArticleCard';
import type { PostMeta } from '@/types';

/** Grid of related articles shown beneath an article body. */
export function RelatedArticles({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="text-2xl font-semibold text-fg">
        Related articles
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
