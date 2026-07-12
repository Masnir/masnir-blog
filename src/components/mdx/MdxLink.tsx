import Link from 'next/link';
import type { ComponentProps } from 'react';

/**
 * Anchor override used inside MDX. Internal links use next/link (client nav);
 * external links open safely in a new tab with rel="noopener noreferrer".
 */
export function MdxLink({ href = '', children, ...props }: ComponentProps<'a'>) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
