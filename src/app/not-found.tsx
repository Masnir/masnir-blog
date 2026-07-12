import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

/**
 * Global 404. Root not-found doesn't inherit the (site) group layout, so it
 * renders its own header/footer to stay consistent.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <Container>
          <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
            <p className="font-mono text-6xl font-bold text-accent">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-fg sm:text-3xl">Page not found</h1>
            <p className="mt-3 max-w-md text-muted">
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s
              get you back on track.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/">Go home</Button>
              <Button href="/blog" variant="secondary">
                Browse the blog
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
