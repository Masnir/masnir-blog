/**
 * Minimal className combiner. Filters out falsy values and joins with spaces.
 * (Kept dependency-free — no clsx/tailwind-merge needed for our usage.)
 */
export function cn(...inputs: Array<string | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ');
}
