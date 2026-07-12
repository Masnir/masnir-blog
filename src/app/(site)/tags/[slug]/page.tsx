import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { content } from '@/lib/content';
import { humanizeTag } from '@/lib/utils/format';
import { buildMetadata } from '@/lib/seo/metadata';

/** Static params for every tag slug that appears on a post. */
export async function generateStaticParams() {
  const tags = await content.getAllTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = humanizeTag(slug);
  return buildMetadata({
    title: `#${name}`,
    description: `Articles tagged ${name}.`,
    path: `/tags/${slug}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await content.getPostsByTag(slug);
  if (posts.length === 0) notFound();

  const name = humanizeTag(slug);

  return (
    <>
      <PageHeader
        title={`#${name}`}
        description={`${posts.length} article${posts.length === 1 ? '' : 's'} tagged ${name}.`}
      >
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Tags', path: '/tags' },
            { name: `#${name}`, path: `/tags/${slug}` },
          ]}
        />
      </PageHeader>
      <Container>
        <div className="py-14">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} priority={i < 3} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
