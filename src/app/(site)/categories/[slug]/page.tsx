import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { content } from '@/lib/content';
import { categories, getCategory } from '@/content/config/categories';
import { buildMetadata } from '@/lib/seo/metadata';

/** Static params for every category slug. */
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = await content.getPostsByCategory(slug);

  return (
    <>
      <PageHeader title={category.name} description={category.description}>
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            { name: category.name, path: `/categories/${slug}` },
          ]}
        />
      </PageHeader>
      <Container>
        <div className="py-14">
          {posts.length === 0 ? (
            <p className="text-muted">No articles in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <ArticleCard key={post.slug} post={post} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
