import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { SearchClient } from '@/components/search/SearchClient';
import { buildSearchIndex } from '@/lib/search/searchIndex';
import { content } from '@/lib/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  description: 'Search Masnir articles by keyword, category, or tag.',
  path: '/search',
});

/**
 * Search page. The index is generated at build time and embedded, so search
 * runs entirely client-side with no backend — fast and free.
 */
export default async function SearchPage() {
  const [docs, categories] = await Promise.all([buildSearchIndex(), content.getUsedCategories()]);

  return (
    <>
      <PageHeader title="Search" description="Find articles across every topic we cover." />
      <Container>
        <SearchClient docs={docs} categories={categories} />
      </Container>
    </>
  );
}
