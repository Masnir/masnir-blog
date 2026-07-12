import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { categories } from '@/content/config/categories';
import { siteConfig } from '@/content/config/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: `About ${siteConfig.name} — who we are and what we write about.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader title={`About ${siteConfig.name}`} description={siteConfig.tagline} />
      <Container>
        <div className="mx-auto max-w-prose py-14">
          <div className="prose prose-lg">
            <p>
              {siteConfig.name} is a cybersecurity company helping organizations secure their cloud,
              AI, and connected-vehicle systems. This blog is where our engineers and researchers
              share what we learn in the field.
            </p>
            <h2>What we write about</h2>
            <p>
              We publish practical, technically-rigorous content across cloud security, DevSecOps,
              Kubernetes, application and API security, identity, zero trust, threat intelligence,
              and the fast-moving worlds of AI security and automotive cybersecurity.
            </p>
            <h2>Our approach</h2>
            <p>
              Every article aims to be accurate, reproducible, and free of hype. We favor defensive,
              responsible security content and real-world guidance you can apply.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-fg">Topics we cover</h2>
            <div className="mt-6">
              <CategoryGrid categories={categories.slice(0, 6)} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
