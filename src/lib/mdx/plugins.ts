/**
 * Shared remark/rehype plugin configuration for the MDX pipeline.
 * Used by next-mdx-remote when compiling article bodies.
 *
 * Security note: MDX is authored by trusted editors via Decap CMS (Git commits),
 * so we allow rich content. `rehype-pretty-code` + KaTeX render code/math; if
 * untrusted MDX is ever introduced, add `rehype-sanitize` to this chain.
 */
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code';

const prettyCodeOptions: PrettyCodeOptions = {
  // Dual themes; CSS in globals.css maps them to our tokens.
  theme: { dark: 'github-dark-dimmed', light: 'github-light' },
  keepBackground: false,
  defaultLang: 'plaintext',
};

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkMath],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, prettyCodeOptions],
    rehypeKatex,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'append',
        properties: {
          className: ['heading-anchor'],
          'aria-label': 'Link to this section',
        },
      },
    ],
  ],
} as const;
