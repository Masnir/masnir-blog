import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';

/** Consistent header band for listing/utility pages. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-border bg-bg-subtle">
      <Container>
        <div className="py-14 sm:py-16">
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-muted">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
