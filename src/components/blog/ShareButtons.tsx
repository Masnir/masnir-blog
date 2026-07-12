'use client';

import { useState } from 'react';
import { CheckIcon, LinkIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';

/** Social share + copy-link buttons for an article. */
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm font-medium text-muted">Share</span>
      <ShareLink
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        label="Share on Twitter/X"
      >
        <TwitterIcon className="h-[18px] w-[18px]" />
      </ShareLink>
      <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        label="Share on LinkedIn"
      >
        <LinkedinIcon className="h-[18px] w-[18px]" />
      </ShareLink>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
      >
        {copied ? (
          <CheckIcon className="h-[18px] w-[18px] text-success" />
        ) : (
          <LinkIcon className="h-[18px] w-[18px]" />
        )}
      </button>
    </div>
  );
}

function ShareLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      {children}
    </a>
  );
}
