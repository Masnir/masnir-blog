import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { siteConfig } from '@/content/config/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `Terms of service for the ${siteConfig.title}.`,
  path: '/terms',
});

/**
 * Terms of Service. Baseline template — have it reviewed by counsel before use.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" description="Last updated: July 2026" />
      <Container>
        <div className="mx-auto max-w-prose py-14">
          <div className="prose prose-lg">
            <p>
              By accessing the {siteConfig.title} ({siteConfig.url}), you agree to these Terms.
            </p>
            <h2>Content and intended use</h2>
            <p>
              All security content is provided for educational and defensive purposes only. You are
              responsible for complying with all applicable laws and for obtaining proper
              authorization before testing any system.
            </p>
            <h2>Intellectual property</h2>
            <p>
              Unless otherwise stated, content is © {siteConfig.organization.name}. You may share
              and quote articles with attribution and a link to the original.
            </p>
            <h2>No warranty</h2>
            <p>
              Content is provided &ldquo;as is&rdquo; without warranties of any kind. We are not
              liable for any damages arising from use of the information provided.
            </p>
            <h2>External links</h2>
            <p>We are not responsible for the content or practices of third-party websites.</p>
            <h2>Changes</h2>
            <p>We may update these Terms; continued use constitutes acceptance of any changes.</p>
            <h2>Contact</h2>
            <p>
              Questions about these Terms? Reach us via the <a href="/contact">contact page</a>.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
