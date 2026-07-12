interface Reference {
  title: string;
  url: string;
  author?: string;
}

/**
 * Numbered reference/citation list for research articles.
 * Usage: <References items={[{ title, url, author }, ...]} />
 */
export function References({ items }: { items: Reference[] }) {
  return (
    <section aria-labelledby="references-heading" className="my-10">
      <h2 id="references-heading" className="text-xl font-semibold text-fg">
        References
      </h2>
      <ol className="mt-4 space-y-2 text-sm text-muted">
        {items.map((ref, i) => (
          <li key={ref.url} className="flex gap-2">
            <span className="shrink-0 text-accent">[{i + 1}]</span>
            <span>
              {ref.author && <span>{ref.author}. </span>}
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                {ref.title}
              </a>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
