import { slugify } from '@/lib/utils/format';
import type { TocItem } from '@/types';

/**
 * Extract a table of contents (h2/h3) from raw MDX/markdown text.
 * Uses the same slug algorithm as rehype-slug (github-slugger-like) so anchor
 * IDs match the rendered heading IDs.
 *
 * Skips fenced code blocks so `# comments` inside code aren't treated as headings.
 */
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1]!.length;
    const rawTitle = match[2]!.replace(/[*_`]/g, '').trim();
    let id = slugify(rawTitle);

    // De-duplicate ids the way github-slugger does (-1, -2, ...).
    if (seen.has(id)) {
      const next = seen.get(id)! + 1;
      seen.set(id, next);
      id = `${id}-${next}`;
    } else {
      seen.set(id, 0);
    }

    toc.push({ id, title: rawTitle, level });
  }

  return toc;
}
