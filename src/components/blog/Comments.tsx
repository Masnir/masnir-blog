import { siteConfig } from '@/content/config/site';

/**
 * Comments slot. Architecture-ready but DISABLED by default
 * (NEXT_PUBLIC_COMMENTS_ENABLED=false). When enabled, wire a provider such as
 * giscus/Disqus here — the article page already renders this component in place,
 * so no page changes are needed to turn comments on.
 */
export function Comments() {
  if (!siteConfig.features.comments) return null;

  return (
    <section aria-labelledby="comments-heading" className="mt-16 border-t border-border pt-8">
      <h2 id="comments-heading" className="text-2xl font-semibold text-fg">
        Comments
      </h2>
      {/* TODO: mount giscus/Disqus/other provider using NEXT_PUBLIC_GISCUS_* env vars. */}
      <p className="mt-4 text-sm text-muted">Comments provider not configured.</p>
    </section>
  );
}
