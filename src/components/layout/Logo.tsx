import Link from 'next/link';
import { ShieldIcon } from '@/components/ui/icons';
import { siteConfig } from '@/content/config/site';

/** Wordmark + shield glyph. Uses accent token so it re-themes automatically. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label={`${siteConfig.name} — home`}>
      <span className="inline-flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <ShieldIcon className="h-5 w-5" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-fg">
          {siteConfig.name}
          <span className="text-accent">.</span>
        </span>
      </span>
    </Link>
  );
}
