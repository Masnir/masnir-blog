import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { ClockIcon } from '@/components/ui/icons';
import { getCategoryName } from '@/content/config/categories';
import { formatDate, formatReadingTime, toDateTimeAttr } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { PostMeta } from '@/types';

/**
 * Article preview card used in listings, home sections, and related lists.
 * `variant="featured"` renders a larger, image-forward layout.
 */
export function ArticleCard({
  post,
  variant = 'default',
  priority = false,
}: {
  post: PostMeta;
  variant?: 'default' | 'featured' | 'compact';
  priority?: boolean;
}) {
  const href = `/blog/${post.slug}`;
  const categoryName = getCategoryName(post.category);

  if (variant === 'compact') {
    return (
      <article className="group">
        <Link href={href} className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="text-accent">{categoryName}</span>
            <span aria-hidden>·</span>
            <span>{formatReadingTime(post.readingTimeMinutes)}</span>
          </div>
          <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
            {post.title}
          </h3>
        </Link>
      </article>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5',
        isFeatured && 'md:flex-row',
      )}
    >
      <Link
        href={href}
        className={cn(
          'relative block aspect-[16/9] overflow-hidden bg-bg-subtle',
          isFeatured && 'md:aspect-auto md:w-1/2',
        )}
        tabIndex={-1}
        aria-hidden
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt ?? ''}
            fill
            priority={priority}
            sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-grid flex h-full w-full items-center justify-center text-muted">
            <span className="text-4xl font-bold text-border">{categoryName}</span>
          </div>
        )}
      </Link>

      <div className={cn('flex flex-1 flex-col p-5', isFeatured && 'md:justify-center md:p-8')}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="accent" href={`/categories/${post.category}`}>
            {categoryName}
          </Badge>
          {post.featured && !isFeatured && <Badge variant="outline">Featured</Badge>}
        </div>

        <h3
          className={cn(
            'font-semibold leading-tight text-fg transition-colors group-hover:text-accent',
            isFeatured ? 'text-2xl' : 'text-lg',
          )}
        >
          <Link href={href}>{post.title}</Link>
        </h3>

        {post.excerpt && (
          <p
            className={cn(
              'mt-2 text-sm leading-relaxed text-muted',
              isFeatured ? 'line-clamp-3' : 'line-clamp-2',
            )}
          >
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={toDateTimeAttr(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="h-3.5 w-3.5" />
            {formatReadingTime(post.readingTimeMinutes)}
          </span>
        </div>
      </div>
    </article>
  );
}
