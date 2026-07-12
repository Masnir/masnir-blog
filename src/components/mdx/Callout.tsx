import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'info';

const styles: Record<CalloutType, { wrap: string; icon: string; label: string }> = {
  note: { wrap: 'border-border bg-bg-subtle', icon: 'text-muted', label: 'Note' },
  info: { wrap: 'border-info/30 bg-info/5', icon: 'text-info', label: 'Info' },
  tip: { wrap: 'border-success/30 bg-success/5', icon: 'text-success', label: 'Tip' },
  warning: { wrap: 'border-warning/30 bg-warning/5', icon: 'text-warning', label: 'Warning' },
  danger: { wrap: 'border-danger/30 bg-danger/5', icon: 'text-danger', label: 'Caution' },
};

const glyphs: Record<CalloutType, ReactNode> = {
  note: <span aria-hidden>✎</span>,
  info: <span aria-hidden>ℹ</span>,
  tip: <span aria-hidden>✓</span>,
  warning: <span aria-hidden>⚠</span>,
  danger: <span aria-hidden>⛔</span>,
};

/**
 * Callout box for notes/tips/warnings inside articles.
 * Usage in MDX: <Callout type="warning" title="Heads up">...</Callout>
 * Convenience wrappers (Note/Tip/Warning) are exported for cleaner authoring.
 */
export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div role="note" className={cn('my-6 flex gap-3 rounded-xl border p-4', s.wrap)}>
      <div className={cn('mt-0.5 shrink-0 text-lg leading-none', s.icon)}>{glyphs[type]}</div>
      <div className="min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {(title ?? s.label) && (
          <p className={cn('mb-1 font-semibold', s.icon)}>{title ?? s.label}</p>
        )}
        <div className="text-sm leading-relaxed text-fg [&_p]:my-2">{children}</div>
      </div>
    </div>
  );
}

export const Note = (p: { title?: string; children: ReactNode }) => <Callout type="note" {...p} />;
export const Tip = (p: { title?: string; children: ReactNode }) => <Callout type="tip" {...p} />;
export const Warning = (p: { title?: string; children: ReactNode }) => (
  <Callout type="warning" {...p} />
);
export const Info = (p: { title?: string; children: ReactNode }) => <Callout type="info" {...p} />;
export const Danger = (p: { title?: string; children: ReactNode }) => (
  <Callout type="danger" {...p} />
);
