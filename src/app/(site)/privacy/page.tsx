import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { siteConfig } from '@/content/config/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `Privacy policy for the ${siteConfig.title}.`,
  path: '/privacy',
});

/**
 * Privacy policy. This is a sensible baseline template — have it reviewed by
 * counsel before relying on it for compliance (GDPR/CCPA/etc.).
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="Last updated: July 2026" />
      <Container>
        <div className="mx-auto max-w-prose py-14">
          <div className="prose prose-lg">
            <p>
              This Privacy Policy describes how {siteConfig.organization.name} (&ldquo;we&rdquo;)
              handles information in connection with the {siteConfig.title} at {siteConfig.url}.
            </p>
            <h2>Information we collect</h2>
            <p>
              This blog is a static website. We do not require an account to read articles. If you
              subscribe to our newsletter or use the contact form, we collect the information you
              provide (such as your email address and message) solely to respond to you or send the
              content you requested.
            </p>
            <h2>Analytics</h2>
            <p>
              We may use privacy-respecting, cookieless analytics to understand aggregate traffic.
              We do not sell personal information.
            </p>
            <h2>Cookies</h2>
            <p>
              We use minimal local storage to remember your theme preference (dark/light). This does
              not identify you.
            </p>
            <h2>Third-party links</h2>
            <p>Articles may link to third-party sites whose privacy practices we do not control.</p>
            <h2>Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of any personal data you have
              provided by contacting us via the <a href="/contact">contact page</a>.
            </p>
            <h2>Changes</h2>
            <p>We may update this policy; material changes will be reflected by the date above.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
