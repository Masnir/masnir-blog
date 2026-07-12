'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { SearchIcon } from '@/components/ui/icons';
import { Badge } from '@/components/ui/Badge';
import { getCategoryName } from '@/content/config/categories';
import { formatDate, formatReadingTime, humanizeTag } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { Category, SearchDoc, SortOrder } from '@/types';

/**
 * Client-side full-text search over a build-time index. Zero backend cost.
 * Supports free-text query, category + tag filtering, and sorting.
 */
export function SearchClient({ docs, categories }: { docs: SearchDoc[]; categories: Category[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');
  const [sort, setSort] = useState<SortOrder>('newest');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = docs.filter((doc) => {
      const matchesQuery =
        q === '' ||
        doc.title.toLowerCase().includes(q) ||
        doc.excerpt.toLowerCase().includes(q) ||
        doc.tags.some((t) => t.includes(q)) ||
        getCategoryName(doc.category).toLowerCase().includes(q);
      const matchesCategory = category === '' || doc.category === category;
      const matchesTag = activeTag === '' || doc.tags.includes(activeTag);
      return matchesQuery && matchesCategory && matchesTag;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'reading-time':
          return a.readingTimeMinutes - b.readingTimeMinutes;
        case 'popular': // index has no popularity signal; fall back to newest
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    return list;
  }, [docs, query, category, activeTag, sort]);

  // Suggestions: titles matching the current query (max 5).
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return docs.filter((d) => d.title.toLowerCase().includes(q)).slice(0, 5);
  }, [docs, query]);

  return (
    <div className="py-14">
      {/* Search input */}
      <div className="relative mx-auto max-w-2xl">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, topics, tags…"
          aria-label="Search articles"
          className="h-14 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-lg text-fg placeholder:text-muted focus-visible:border-accent"
        />
        {suggestions.length > 0 && query.trim() !== '' && (
          <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {suggestions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/blog/${s.slug}`}
                  className="block px-4 py-2.5 text-sm text-fg hover:bg-bg-subtle"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filters */}
      <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === ''} onClick={() => setCategory('')}>
            All topics
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOrder)}
            className="h-9 rounded-lg border border-border bg-card px-2 text-fg focus-visible:border-accent"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="reading-time">Reading time</option>
          </select>
        </label>
      </div>

      {/* Active tag filter indicator */}
      {activeTag && (
        <div className="mx-auto mt-4 max-w-4xl text-sm text-muted">
          Filtering by tag{' '}
          <button onClick={() => setActiveTag('')} className="text-accent hover:underline">
            #{humanizeTag(activeTag)} ✕
          </button>
        </div>
      )}

      {/* Results */}
      <div className="mx-auto mt-8 max-w-4xl">
        <p className="mb-4 text-sm text-muted">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
        <ul className="divide-y divide-border">
          {results.map((doc) => (
            <li key={doc.slug} className="py-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="accent">{getCategoryName(doc.category)}</Badge>
                <span className="text-xs text-muted">
                  {formatDate(doc.publishedAt)} · {formatReadingTime(doc.readingTimeMinutes)}
                </span>
              </div>
              <Link href={`/blog/${doc.slug}`} className="group">
                <h2 className="text-lg font-semibold text-fg transition-colors group-hover:text-accent">
                  {doc.title}
                </h2>
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{doc.excerpt}</p>
              {doc.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {doc.tags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTag(t)}
                      className="text-xs text-muted transition-colors hover:text-accent"
                    >
                      #{humanizeTag(t)}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className="py-10 text-center text-muted">
            No articles match your search. Try a different term.
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-sm transition-colors',
        active
          ? 'border-accent bg-accent/10 text-accent'
          : 'border-border text-muted hover:border-accent/50 hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}
