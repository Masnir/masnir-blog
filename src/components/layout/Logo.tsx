import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/config/site';

/**
 * Brand logo — theme-aware Masnir SVG lockups, served locally for instant,
 * every-page rendering. Light/dark variants are swapped via CSS `dark:`
 * visibility (no theme flash, works in a server component).
 *
 * The source SVGs carry a solid background rect, so we clip each into a
 * rounded badge — the fill reads as an intentional logo tile rather than a
 * stray rectangle on the near-black header.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className} aria-label={`${siteConfig.name} — home`}>
      <span className="inline-flex h-20 items-center overflow-hidden rounded-full">
        {/* Light-mode logo (hidden in dark) */}
        <Image
          src="/brand/masnir-logo-light.svg"
          alt={`${siteConfig.name} logo`}
          width={500}
          height={620}
          priority
          className="h-12 w-auto dark:hidden"
        />
        {/* Dark-mode logo (hidden in light) */}
        <Image
          src="/brand/masnir-logo-dark.svg"
          alt={`${siteConfig.name} logo`}
          width={500}
          height={620}
          priority
          className="hidden h-12 w-auto dark:block"
        />
      </span>
    </Link>
  );
}
