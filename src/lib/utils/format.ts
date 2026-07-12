/** Date & string formatting helpers. */

/** Format an ISO date as e.g. "Jul 12, 2026". Stable across server/client. */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Machine-readable date attribute for <time>. */
export function toDateTimeAttr(iso: string): string {
  return new Date(iso).toISOString();
}

/** "5 min read" from minutes. */
export function formatReadingTime(minutes: number): string {
  return `${Math.max(1, Math.round(minutes))} min read`;
}

/**
 * Convert an arbitrary string into a URL-safe slug.
 * Used for automatic slug generation from titles and for tags.
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s-]/g, '') // drop non-alphanumerics
    .replace(/[\s_-]+/g, '-') // collapse whitespace/underscores to single dash
    .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
}

/** Turn a tag slug back into a display label ("zero-trust" -> "Zero Trust"). */
export function humanizeTag(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
