import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'accent' | 'muted' | 'outline';

const variants: Record<BadgeVariant, string> = {
  accent: 'bg-accent/10 text-accent border border-accent/20',
  muted: 'bg-bg-subtle text-muted border border-border',
  outline: 'border border-border text-fg',
};

/** Small pill for categories/tags. Renders as a link when `href` is set. */
export function Badge({
  variant = 'muted',
  href,
  className,
  children,
}: {
  variant?: BadgeVariant;
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
    variants[variant],
    href && 'hover:border-accent/50 hover:text-accent',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}
