import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

/** Centered, max-width page container with responsive gutters. */
export function Container({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn('container-site', className)}>{children}</Tag>;
}
