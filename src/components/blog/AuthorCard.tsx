import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, LinkIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';
import type { Author } from '@/types';

/** Full author bio card, shown at the end of an article and on author pages. */
export function AuthorCard({ author }: { author: Author | null }) {
  if (!author) return null;

  return (
    <aside className="mt-12 flex flex-col gap-4 rounded-xl border border-border bg-bg-subtle p-6 sm:flex-row">
      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-card">
        {author.avatar ? (
          <Image src={author.avatar} alt={author.name} fill sizes="64px" className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-muted">
            {author.name.charAt(0)}
          </span>
        )}
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted">Written by</p>
        <Link
          href={`/author/${author.slug}`}
          className="text-lg font-semibold text-fg hover:text-accent"
        >
          {author.name}
        </Link>
        {author.role && <p className="text-sm text-muted">{author.role}</p>}
        <p className="mt-2 text-sm leading-relaxed text-muted">{author.bio}</p>
        {author.links && (
          <div className="mt-3 flex items-center gap-3 text-muted">
            {author.links.twitter && (
              <a
                href={author.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on Twitter/X`}
                className="hover:text-accent"
              >
                <TwitterIcon className="h-[18px] w-[18px]" />
              </a>
            )}
            {author.links.github && (
              <a
                href={author.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on GitHub`}
                className="hover:text-accent"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
            )}
            {author.links.linkedin && (
              <a
                href={author.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on LinkedIn`}
                className="hover:text-accent"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            )}
            {author.links.website && (
              <a
                href={author.links.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name}'s website`}
                className="hover:text-accent"
              >
                <LinkIcon className="h-[18px] w-[18px]" />
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
