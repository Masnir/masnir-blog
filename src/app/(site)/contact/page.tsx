import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { ContactForm } from '@/components/blog/ContactForm';
import { siteImages } from '@/content/config/images';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Get in touch with the Masnir team.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        description="Questions, feedback, or a security topic you'd like us to cover? Reach out."
        image={siteImages.contact}
      />
      <Container>
        <div className="mx-auto max-w-prose py-14">
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
