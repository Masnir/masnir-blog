import { MdxContentSource } from './MdxContentSource';
import type { ContentSource } from './ContentSource';

/**
 * The app's single content entry point.
 *
 * Every page/component imports `content` from here — never a concrete adapter.
 * To migrate to a database later, construct a different ContentSource
 * implementation and export it as `content`; nothing else changes.
 */
export const content: ContentSource = new MdxContentSource();

export type { ContentSource };
