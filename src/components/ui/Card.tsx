import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/** Surface container used for cards across the site. */
export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card',
        interactive &&
          'transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5',
        className,
      )}
    >
      {children}
    </div>
  );
}
