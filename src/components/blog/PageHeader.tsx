import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';

/**
 * Consistent header band for listing/utility pages.
 * Pass `image` to render a dimmed photo banner behind the title (used on
 * About/Contact); omit it for the plain subtle-surface band.
 */
export function PageHeader({
  title,
  description,
  image,
  children,
}: {
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-bg-subtle">
      {image && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 dark:opacity-25"
          />
          {/* Wash toward the surface so heading text keeps strong contrast. */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-subtle via-bg-subtle/85 to-bg-subtle/60" />
        </div>
      )}
      <Container>
        <div className="relative py-14 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
