/**
 * Renders a JSON-LD structured-data script. Content is server-generated from
 * trusted config/frontmatter, so injecting via dangerouslySetInnerHTML is safe.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
