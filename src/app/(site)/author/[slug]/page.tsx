import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/blog/PageHeader';
import { ArticleCard } from '@/components/blog/ArticleCard';
import { GithubIcon, LinkIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';
import { content } from '@/lib/content';
import { buildMetadata } from '@/lib/seo/metadata';

/** Static params for every author profile. */
export async function generateStaticParams() {
  const authors = await content.getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await content.getAuthor(slug);
  if (!author) return {};
  return buildMetadata({
    title: author.name,
    description: author.bio,
    path: `/author/${slug}`,
  });
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await content.getAuthor(slug);
  if (!author) notFound();

  const allPosts = await content.getAllPosts();
  const posts = allPosts.filter((p) => p.author === slug);

  return (
    <>
      <PageHeader title={author.name} description={author.role} />
      <Container>
        <div className="py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-border bg-bg-subtle">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted">
                  {author.name.charAt(0)}
                </span>
              )}
            </span>
            <div>
              <p className="max-w-2xl text-muted">{author.bio}</p>
              {author.links && (
                <div className="mt-4 flex items-center gap-3 text-muted">
                  {author.links.twitter && (
                    <a
                      href={author.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter/X"
                      className="hover:text-accent"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.links.github && (
                    <a
                      href={author.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="hover:text-accent"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.links.linkedin && (
                    <a
                      href={author.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-accent"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  {author.links.website && (
                    <a
                      href={author.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Website"
                      className="hover:text-accent"
                    >
                      <LinkIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <h2 className="mt-14 text-2xl font-semibold text-fg">Articles by {author.name}</h2>
          {posts.length === 0 ? (
            <p className="mt-4 text-muted">No articles yet.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
