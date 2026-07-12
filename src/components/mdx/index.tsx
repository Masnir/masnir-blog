import type { MDXComponents } from 'mdx/types';
import { Callout, Danger, Info, Note, Tip, Warning } from './Callout';
import { Collapsible } from './Collapsible';
import { Figure } from './Figure';
import { Gallery } from './Gallery';
import { Video } from './Video';
import { References } from './References';
import { InlineCode, Pre } from './CodeBlock';
import { MdxLink } from './MdxLink';

/**
 * The component map passed to MDXRemote. Custom components are available by
 * name inside MDX; HTML element overrides style native markdown output to our
 * design system.
 */
export const mdxComponents: MDXComponents = {
  // Custom authoring components
  Callout,
  Note,
  Tip,
  Warning,
  Info,
  Danger,
  Collapsible,
  Figure,
  Gallery,
  Video,
  References,

  // Element overrides
  a: MdxLink as MDXComponents['a'],
  pre: Pre as MDXComponents['pre'],
  code: InlineCode as MDXComponents['code'],
};
