import type { Category } from '@/types';

/**
 * Fixed category taxonomy. The `slug` is the stable key stored in post
 * frontmatter and used in URLs (/categories/[slug]); the `name` is the display
 * label. Keep this list authoritative — the Decap CMS config mirrors it.
 */
export const categories: Category[] = [
  {
    slug: 'cloud-security',
    name: 'Cloud Security',
    description: 'Securing cloud workloads, posture, and configuration across providers.',
  },
  { slug: 'aws', name: 'AWS', description: 'Amazon Web Services security, IAM, and hardening.' },
  { slug: 'azure', name: 'Azure', description: 'Microsoft Azure security and identity.' },
  { slug: 'oci', name: 'OCI', description: 'Oracle Cloud Infrastructure security.' },
  {
    slug: 'devsecops',
    name: 'DevSecOps',
    description: 'Shifting security left across the SDLC and CI/CD.',
  },
  {
    slug: 'application-security',
    name: 'Application Security',
    description: 'AppSec, secure coding, and vulnerability management.',
  },
  {
    slug: 'api-security',
    name: 'API Security',
    description: 'Protecting APIs from abuse, injection, and broken auth.',
  },
  {
    slug: 'kubernetes',
    name: 'Kubernetes',
    description: 'Container and Kubernetes security at scale.',
  },
  {
    slug: 'threat-intelligence',
    name: 'Threat Intelligence',
    description: 'Adversary tracking, IOCs, and threat analysis.',
  },
  {
    slug: 'iam',
    name: 'Identity & Access Management',
    description: 'Identity, authentication, and authorization.',
  },
  {
    slug: 'zero-trust',
    name: 'Zero Trust',
    description: 'Zero Trust architecture and implementation.',
  },
  {
    slug: 'ai-security',
    name: 'AI Security',
    description: 'Securing AI/ML systems, LLMs, and prompt-injection defense.',
  },
  {
    slug: 'vehicle-cybersecurity',
    name: 'Vehicle Cybersecurity',
    description: 'Cybersecurity for connected and autonomous vehicles.',
  },
  {
    slug: 'automotive-security',
    name: 'Automotive Security',
    description: 'ECU, CAN bus, and automotive threat modeling.',
  },
  { slug: 'research', name: 'Research', description: 'Original security research and deep dives.' },
  { slug: 'tutorials', name: 'Tutorials', description: 'Step-by-step, hands-on security guides.' },
  {
    slug: 'opinion',
    name: 'Opinion',
    description: 'Perspectives and commentary from the Masnir team.',
  },
  { slug: 'news', name: 'News', description: 'Security news, disclosures, and industry updates.' },
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getCategoryName(slug: string): string {
  return categoryBySlug.get(slug)?.name ?? slug;
}
