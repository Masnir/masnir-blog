import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from './Container';
import { ArrowRightIcon } from './icons';
import { cn } from '@/lib/utils/cn';

/**
 * A titled homepage section with optional "view all" link.
 * Keeps vertical rhythm consistent across the page.
 */
export function Section({
  title,
  description,
  href,
  hrefLabel = 'View all',
  className,
  children,
}: {
  title?: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn('py-14 sm:py-16', className)}>
      <Container>
        {(title || href) && (
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              {title && (
                <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {title}
                </h2>
              )}
              {description && <p className="mt-2 max-w-2xl text-muted">{description}</p>}
            </div>
            {href && (
              <Link
                href={href}
                className="hidden shrink-0 items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
              >
                {hrefLabel}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
