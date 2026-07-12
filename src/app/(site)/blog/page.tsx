import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Pagination } from '@/components/blog/Pagination';
import { content } from '@/lib/content';
import { siteConfig } from '@/content/config/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'All articles from Masnir — cybersecurity and AI research, tutorials, and analysis.',
  path: '/blog',
});

/** Blog listing with pagination. `?page=N` selects the page. */
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const posts = await content.getAllPosts();

  const perPage = siteConfig.postsPerPage;
  const totalPages = Math.max(1, Math.ceil(posts.length / perPage));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const start = (currentPage - 1) * perPage;
  const pagePosts = posts.slice(start, start + perPage);

  return (
    <>
      <PageHeader
        title="The Masnir Blog"
        description={`Research, tutorials, and analysis on cybersecurity and AI. ${posts.length} article${posts.length === 1 ? '' : 's'} published.`}
      />
      <Container>
        <div className="py-14">
          {pagePosts.length === 0 ? (
            <p className="text-muted">No articles published yet. Check back soon.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post, i) => (
                <ArticleCard key={post.slug} post={post} priority={i < 3} />
              ))}
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
        </div>
      </Container>
    </>
  );
}
