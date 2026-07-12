import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Tailwind theme is driven entirely by CSS custom properties defined in
 * `src/styles/tokens.css`. Components reference *semantic* color names
 * (bg, fg, accent, border, ...) — never raw hex values. This means the whole
 * site can be re-themed (e.g. change the accent) by editing tokens.css alone.
 *
 * Colors use the `hsl(var(--token) / <alpha-value>)` pattern so Tailwind's
 * opacity modifiers (e.g. `bg-accent/20`) keep working.
 */
const withOpacity = (variable: string) => `hsl(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: withOpacity('--bg'),
        'bg-subtle': withOpacity('--bg-subtle'),
        card: withOpacity('--card'),
        'card-fg': withOpacity('--card-fg'),
        // Text
        fg: withOpacity('--fg'),
        muted: withOpacity('--muted'),
        // Brand accent (cyber cyan) — the single source of truth lives in tokens.css
        accent: withOpacity('--accent'),
        'accent-fg': withOpacity('--accent-fg'),
        'accent-hover': withOpacity('--accent-hover'),
        // Lines & focus
        border: withOpacity('--border'),
        ring: withOpacity('--ring'),
        // Semantic states (used by callouts, etc.)
        success: withOpacity('--success'),
        warning: withOpacity('--warning'),
        danger: withOpacity('--danger'),
        info: withOpacity('--info'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '72rem', // site container
        prose: '46rem', // article reading width
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out both',
      },
      typography: () => ({
        // Wire the `prose` classes to our tokens so article body respects theme.
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--fg))',
            '--tw-prose-headings': 'hsl(var(--fg))',
            '--tw-prose-links': 'hsl(var(--accent))',
            '--tw-prose-bold': 'hsl(var(--fg))',
            '--tw-prose-counters': 'hsl(var(--muted))',
            '--tw-prose-bullets': 'hsl(var(--border))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-quotes': 'hsl(var(--fg))',
            '--tw-prose-quote-borders': 'hsl(var(--accent))',
            '--tw-prose-captions': 'hsl(var(--muted))',
            '--tw-prose-code': 'hsl(var(--fg))',
            '--tw-prose-pre-code': 'hsl(var(--fg))',
            '--tw-prose-pre-bg': 'hsl(var(--bg-subtle))',
            '--tw-prose-th-borders': 'hsl(var(--border))',
            '--tw-prose-td-borders': 'hsl(var(--border))',
            maxWidth: 'none',
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
