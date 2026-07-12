import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
  secondary: 'bg-card text-fg border border-border hover:border-accent/50',
  outline: 'border border-border text-fg hover:bg-bg-subtle',
  ghost: 'text-fg hover:bg-bg-subtle',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Button that renders as a <Link> when `href` is provided, else a <button>. */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: CommonProps & (({ href: string } & ComponentProps<typeof Link>) | ComponentProps<'button'>)) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    return (
      <Link className={classes} {...(props as ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<'button'>)}>
      {children}
    </button>
  );
}
