'use client';

import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Client providers wrapping the whole app.
 * - next-themes: class-based dark/light, dark-first default, syncs to system.
 *   `disableTransitionOnChange` prevents color-flash when toggling.
 * - MotionConfig reducedMotion="user": Framer honors prefers-reduced-motion.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
