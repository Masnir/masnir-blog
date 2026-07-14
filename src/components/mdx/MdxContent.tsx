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
        // MDX is authored by trusted editors via Git (see lib/mdx/plugins.ts),
        // so keep JS expression props like `<References items={[...]} />`.
        // next-mdx-remote strips them by default (blockJS) as an untrusted-input
        // safeguard, which nukes any `prop={...}` and breaks such components.
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [...mdxOptions.remarkPlugins],
          // Cast: plugin option tuples are validated at runtime by the pipeline.
          rehypePlugins: mdxOptions.rehypePlugins as never,
        },
      }}
    />
  );
}
