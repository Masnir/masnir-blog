import type { Variants } from 'framer-motion';

/**
 * Shared Framer Motion presets. Subtle only — small offsets, short durations.
 * Framer Motion automatically respects prefers-reduced-motion when the
 * MotionConfig `reducedMotion="user"` wrapper is applied (see Providers).
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

/** Staggered container for lists/grids of cards. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** Standard viewport config for scroll-triggered reveals. */
export const inViewOnce = { once: true, margin: '-80px' } as const;
