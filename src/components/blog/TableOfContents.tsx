'use client';

import { useMemo } from 'react';
import { useActiveHeading } from '@/hooks/useActiveHeading';
import { cn } from '@/lib/utils/cn';
import type { TocItem } from '@/types';

/** Sticky table of contents with active-section highlighting. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const activeId = useActiveHeading(ids);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-semibold text-fg">On this page</p>
      <ul className="space-y-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 transition-colors',
                item.level === 3 ? 'pl-6' : 'pl-4',
                activeId === item.id
                  ? 'border-accent font-medium text-accent'
                  : 'border-transparent text-muted hover:border-border hover:text-fg',
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
