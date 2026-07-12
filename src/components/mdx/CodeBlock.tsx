'use client';

import { useRef, useState, type ComponentProps } from 'react';
import { CheckIcon, CopyIcon } from '@/components/ui/icons';

/**
 * Wraps the <pre> emitted by rehype-pretty-code and adds a copy-to-clipboard
 * button. Syntax highlighting/tokens come from Shiki (build time) + globals.css.
 */
export function Pre(props: ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const text = preRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); fail silently.
    }
  };

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg/80 text-muted opacity-0 backdrop-blur transition-opacity hover:text-fg focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-success" /> : <CopyIcon className="h-4 w-4" />}
      </button>
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto rounded-xl border border-border bg-bg-subtle py-4 text-sm leading-relaxed [&>code]:bg-transparent"
      />
    </div>
  );
}

/**
 * Code element override. rehype-pretty-code annotates block code with
 * `data-language`; those pass through untouched (styled by Shiki + globals.css).
 * Only true inline code (no data-language) gets the pill styling.
 */
export function InlineCode({ className, ...props }: ComponentProps<'code'>) {
  const isBlockCode = 'data-language' in props;
  if (isBlockCode) {
    return <code className={className} {...props} />;
  }
  return (
    <code
      {...props}
      className="rounded-md border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
    />
  );
}
