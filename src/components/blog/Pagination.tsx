import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils/cn';

/**
 * Page-number pagination. `basePath` is the route prefix; page 1 links to
 * basePath, later pages to `${basePath}?page=N`.
 */
export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => (page <= 1 ? basePath : `${basePath}?page=${page}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={hrefFor(currentPage - 1)}
          aria-label="Previous page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg hover:bg-bg-subtle"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={hrefFor(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={cn(
            'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium',
            page === currentPage
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-border text-muted hover:bg-bg-subtle hover:text-fg',
          )}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={hrefFor(currentPage + 1)}
          aria-label="Next page"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg hover:bg-bg-subtle"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
