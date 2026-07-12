import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { Badge } from '@/components/ui/Badge';
import { content } from '@/lib/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Tags',
  description: 'Browse Masnir articles by tag.',
  path: '/tags',
});

/** Tags index — a cloud of all tags sized/ordered by usage. */
export default async function TagsPage() {
  const tags = await content.getAllTags();

  return (
    <>
      <PageHeader title="Tags" description="Find articles by specific technologies and themes." />
      <Container>
        <div className="py-14">
          {tags.length === 0 ? (
            <p className="text-muted">No tags yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Badge key={tag.slug} href={`/tags/${tag.slug}`} variant="muted">
                  #{tag.name}
                  <span className="ml-1.5 text-muted/70">{tag.count}</span>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
