import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';
import { GithubIcon, LinkedinIcon, RssIcon, TwitterIcon } from '@/components/ui/icons';
import { siteConfig } from '@/content/config/site';
import { categories } from '@/content/config/categories';

/** Site footer: brand blurb, category links, legal links, socials, RSS. */
export function Footer() {
  const year = new Date().getUTCFullYear();
  const topCategories = categories.slice(0, 8);

  return (
    <footer className="mt-24 border-t border-border bg-bg-subtle">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-4">
          {/* Brand / About Masnir */}
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline} In-depth research and tutorials on cloud, AI, and automotive
              security from the {siteConfig.name} team.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href={siteConfig.social.twitterUrl} label="Twitter/X">
                <TwitterIcon className="h-[18px] w-[18px]" />
              </SocialLink>
              <SocialLink href={siteConfig.social.github} label="GitHub">
                <GithubIcon className="h-[18px] w-[18px]" />
              </SocialLink>
              <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </SocialLink>
              <SocialLink href="/rss.xml" label="RSS feed">
                <RssIcon className="h-[18px] w-[18px]" />
              </SocialLink>
            </div>
          </div>

          {/* Categories */}
          <FooterCol title="Topics">
            {topCategories.map((c) => (
              <FooterLink key={c.slug} href={`/categories/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Explore */}
          <FooterCol title="Explore">
            <FooterLink href="/blog">All Articles</FooterLink>
            <FooterLink href="/categories">Categories</FooterLink>
            <FooterLink href="/tags">Tags</FooterLink>
            <FooterLink href="/search">Search</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          {/* Legal */}
          <FooterCol title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href={siteConfig.organization.url}>Masnir.site</FooterLink>
          </FooterCol>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.organization.name}. All rights reserved.
          </p>
          <p>Built for speed, security, and clarity.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-fg">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors hover:text-accent"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  );
}
