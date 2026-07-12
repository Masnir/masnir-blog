import { Hero } from '@/components/home/Hero';
import { Section } from '@/components/ui/Section';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { TrendingTopics } from '@/components/home/TrendingTopics';
import { AboutMasnir } from '@/components/home/AboutMasnir';
import { Newsletter } from '@/components/blog/Newsletter';
import { Container } from '@/components/ui/Container';
import { content } from '@/lib/content';

/** Homepage — statically generated. Composes the section components. */
export default async function HomePage() {
  const [latest, featured, popular, categories, tags] = await Promise.all([
    content.getLatestPosts(6),
    content.getFeaturedPosts(2),
    content.getPopularPosts(4),
    content.getUsedCategories(),
    content.getAllTags(),
  ]);

  return (
    <>
      <Hero />

      {featured.length > 0 && (
        <Section title="Featured" description="Editor-selected deep dives worth your time.">
          <div className="grid gap-6">
            {featured.map((post, i) => (
              <ArticleCard key={post.slug} post={post} variant="featured" priority={i === 0} />
            ))}
          </div>
        </Section>
      )}

      {latest.length > 0 && (
        <Section
          title="Latest articles"
          description="Fresh research and tutorials from the Masnir team."
          href="/blog"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      {popular.length > 0 && (
        <Section title="Popular reads" className="bg-bg-subtle">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((post) => (
              <ArticleCard key={post.slug} post={post} variant="compact" />
            ))}
          </div>
        </Section>
      )}

      {categories.length > 0 && (
        <Section
          title="Explore by topic"
          description="From cloud and Kubernetes to AI and automotive security."
          href="/categories"
        >
          <CategoryGrid categories={categories.slice(0, 6)} />
        </Section>
      )}

      {tags.length > 0 && (
        <Section title="Trending topics" href="/tags">
          <TrendingTopics tags={tags.slice(0, 16)} />
        </Section>
      )}

      <Section>
        <AboutMasnir />
      </Section>

      <Container>
        <div className="pb-16">
          <Newsletter />
        </div>
      </Container>
    </>
  );
}
