import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './index';
import { mdxOptions } from '@/lib/mdx/plugins';

/**
 * Server component that compiles + renders an MDX article body.
 * Runs at build time (SSG) so there's no client-side MDX cost.
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [...mdxOptions.remarkPlugins],
          // Cast: plugin option tuples are validated at runtime by the pipeline.
          rehypePlugins: mdxOptions.rehypePlugins as never,
        },
      }}
    />
  );
}
