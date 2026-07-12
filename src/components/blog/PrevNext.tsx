import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import type { PostMeta } from '@/types';

/** Previous/next article navigation shown at the end of an article. */
export function PrevNext({ prev, next }: { prev: PostMeta | null; next: PostMeta | null }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Article navigation"
      className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ArrowLeftIcon className="h-3.5 w-3.5" /> Newer
          </span>
          <span className="mt-1 font-medium text-fg transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col rounded-xl border border-border p-4 text-right transition-colors hover:border-accent/40 sm:items-end"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            Older <ArrowRightIcon className="h-3.5 w-3.5" />
          </span>
          <span className="mt-1 font-medium text-fg transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
