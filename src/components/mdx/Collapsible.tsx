import type { ReactNode } from 'react';

/**
 * Collapsible section using native <details> for zero-JS, accessible-by-default
 * disclosure. Usage: <Collapsible title="Show proof">...</Collapsible>
 */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group my-6 overflow-hidden rounded-xl border border-border bg-bg-subtle"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-medium text-fg transition-colors hover:bg-card [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          aria-hidden
          className="text-muted transition-transform duration-200 group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="border-t border-border px-4 py-3 text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </details>
  );
}
