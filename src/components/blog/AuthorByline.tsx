import Link from 'next/link';
import Image from 'next/image';
import type { Author } from '@/types';

/** Compact author byline with avatar, shown near the article title. */
export function AuthorByline({ author }: { author: Author | null }) {
  if (!author) return null;
  return (
    <Link href={`/author/${author.slug}`} className="group inline-flex items-center gap-3">
      <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-full border border-border bg-bg-subtle">
        {author.avatar ? (
          <Image src={author.avatar} alt={author.name} fill sizes="40px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted">
            {author.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-fg transition-colors group-hover:text-accent">
          {author.name}
        </span>
        {author.role && <span className="text-xs text-muted">{author.role}</span>}
      </span>
    </Link>
  );
}
