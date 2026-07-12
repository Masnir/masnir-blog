'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, ShieldIcon } from '@/components/ui/icons';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { siteConfig } from '@/content/config/site';
import { siteImages } from '@/content/config/images';

/** Landing hero: headline, subhead, CTAs over a subtle grid glow. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Decorative photo backdrop (cyber cubes) — dimmed so text stays legible. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={siteImages.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 dark:opacity-30"
        />
        {/* Wash the photo toward the theme bg so it reads as texture, not a photo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/80 to-bg" />
      </div>
      {/* Decorative grid + accent glow (token-driven). */}
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
      />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto max-w-3xl py-20 text-center sm:py-28"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1 text-xs font-medium text-muted">
              <ShieldIcon className="h-3.5 w-3.5 text-accent" />
              Cybersecurity &amp; AI research
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold tracking-tight text-fg sm:text-6xl"
          >
            Security intelligence,
            <br />
            <span className="text-accent">engineered for the real world.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href="/blog" size="lg">
              Read the blog
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button href="/categories" variant="secondary" size="lg">
              Browse topics
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
