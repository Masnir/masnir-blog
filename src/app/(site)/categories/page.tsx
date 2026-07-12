import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { categories } from '@/content/config/categories';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Categories',
  description: 'Browse Masnir articles by security topic.',
  path: '/categories',
});

/** Categories index — shows the full taxonomy. */
export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Categories"
        description="Explore our writing by topic — from cloud and Kubernetes to AI and automotive security."
      />
      <Container>
        <div className="py-14">
          <CategoryGrid categories={categories} />
        </div>
      </Container>
    </>
  );
}
