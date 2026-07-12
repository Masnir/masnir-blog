import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ClockIcon } from '@/components/ui/icons';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { AuthorByline } from '@/components/blog/AuthorByline';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { PrevNext } from '@/components/blog/PrevNext';
import { Comments } from '@/components/blog/Comments';
import { MdxContent } from '@/components/mdx/MdxContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { content } from '@/lib/content';
import { postToMeta } from '@/lib/content/postToMeta';
import { getCategoryName } from '@/content/config/categories';
import { formatDate, formatReadingTime, humanizeTag, toDateTimeAttr } from '@/lib/utils/format';
import { absoluteUrl, buildArticleMetadata } from '@/lib/seo/metadata';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonld';

/** Pre-render every published article at build time. */
export async function generateStaticParams() {
  const slugs = await content.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await content.getPostBySlug(slug);
  if (!post) return {};
  const author = await content.getAuthor(post.frontmatter.author);
  const base = buildArticleMetadata(postToMeta(post), author?.name ?? 'Masnir');
  if (post.frontmatter.seo?.noindex) {
    base.robots = { index: false, follow: false };
  }
  if (post.frontmatter.seo?.canonical) {
    base.alternates = { canonical: post.frontmatter.seo.canonical };
  }
  return base;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await content.getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const [author, related, adjacent] = await Promise.all([
    content.getAuthor(fm.author),
    content.getRelatedPosts(slug, 3),
    content.getAdjacentPosts(slug),
  ]);

  const categoryName = getCategoryName(fm.category);
  const articleUrl = absoluteUrl(`/blog/${slug}`);
  const meta = postToMeta(post);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: categoryName, path: `/categories/${fm.category}` },
    { name: fm.title, path: `/blog/${slug}` },
  ];

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleJsonLd(meta, author)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <Container>
        <article className="py-10">
          {/* Header */}
          <header className="mx-auto max-w-prose">
            <Breadcrumbs items={crumbs} />
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="accent" href={`/categories/${fm.category}`}>
                {categoryName}
              </Badge>
              {fm.featured && <Badge variant="outline">Featured</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
              {fm.title}
            </h1>
            {fm.subtitle && <p className="mt-3 text-lg text-muted">{fm.subtitle}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <AuthorByline author={author} />
              <div className="flex items-center gap-3 text-sm text-muted">
                <time dateTime={toDateTimeAttr(fm.publishedAt)}>{formatDate(fm.publishedAt)}</time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {formatReadingTime(post.readingTimeMinutes)}
                </span>
              </div>
            </div>
          </header>

          {/* Cover image */}
          {fm.coverImage && (
            <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-border">
              <Image
                src={fm.coverImage}
                alt={fm.coverImageAlt ?? fm.title}
                width={1600}
                height={900}
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="h-auto w-full"
              />
            </div>
          )}

          {/* Body + sticky TOC */}
          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_16rem]">
            <div className="min-w-0">
              <div className="prose prose-lg mx-auto max-w-prose">
                <MdxContent source={post.content} />
              </div>

              {fm.updatedAt && (
                <p className="mx-auto mt-8 max-w-prose text-sm text-muted">
                  Last updated{' '}
                  <time dateTime={toDateTimeAttr(fm.updatedAt)}>{formatDate(fm.updatedAt)}</time>.
                </p>
              )}

              {/* Tags + share */}
              <div className="mx-auto mt-8 flex max-w-prose flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <div className="flex flex-wrap gap-2">
                  {fm.tags.map((tag) => (
                    <Badge key={tag} href={`/tags/${tag}`}>
                      #{humanizeTag(tag)}
                    </Badge>
                  ))}
                </div>
                <ShareButtons url={articleUrl} title={fm.title} />
              </div>

              <div className="mx-auto max-w-prose">
                <AuthorCard author={author} />
                <PrevNext prev={adjacent.prev} next={adjacent.next} />
                <Comments />
              </div>
            </div>

            {/* TOC — sticky sidebar on large screens */}
            {post.toc.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents items={post.toc} />
                </div>
              </aside>
            )}
          </div>

          <div className="mx-auto max-w-6xl">
            <RelatedArticles posts={related} />
          </div>
        </article>
      </Container>
    </>
  );
}
