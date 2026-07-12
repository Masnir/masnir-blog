import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/content/config/site';

/** "About Masnir" band for the homepage. */
export function AboutMasnir() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-subtle p-8 sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative max-w-2xl">
        <>
          <Image
            src="/brand/masnir-logo-light.svg"
            alt={`${siteConfig.name} logo`}
            width={130}
            height={160}
            className="h-20 w-auto rounded-lg dark:hidden"
          />
          <Image
            src="/brand/masnir-logo-dark.svg"
            alt={`${siteConfig.name} logo`}
            width={130}
            height={160}
            className="hidden h-20 w-auto rounded-lg dark:block"
          />
        </>
        <h2 className="mt-4 text-2xl font-semibold text-fg sm:text-3xl">About {siteConfig.name}</h2>
        <p className="mt-3 text-muted">
          {siteConfig.name} is a cybersecurity company focused on securing modern cloud, AI, and
          automotive systems. This blog shares our research, field-tested tutorials, and honest
          analysis — the same rigor we bring to client engagements, made public.
        </p>
        <div className="mt-6">
          <Button href="/about" variant="secondary">
            Learn more about us
          </Button>
        </div>
      </div>
    </div>
  );
}
