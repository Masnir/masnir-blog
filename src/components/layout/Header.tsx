'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CloseIcon, MenuIcon, SearchIcon } from '@/components/ui/icons';
import { Logo } from './Logo';
import { siteConfig } from '@/content/config/site';
import { cn } from '@/lib/utils/cn';

/** Sticky site header: logo, primary nav, search entry, theme toggle, mobile menu. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href) ? 'text-accent' : 'text-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {siteConfig.features.search && (
              <Link
                href="/search"
                aria-label="Search articles"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:bg-bg-subtle"
              >
                <SearchIcon className="h-[18px] w-[18px]" />
              </Link>
            )}
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <MenuIconClose /> : <MenuIcon className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile nav */}
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-bg md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-3 text-sm font-medium',
                      isActive(item.href) ? 'text-accent' : 'text-fg hover:bg-bg-subtle',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}

function MenuIconClose() {
  return <CloseIcon className="h-[18px] w-[18px]" />;
}
