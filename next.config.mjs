/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Allow optimized remote images if a post references an external cover.
    // Add hostnames here as needed; keep the list tight for security.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.masnir.site',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // MDX is compiled at runtime via next-mdx-remote; no pageExtensions needed.
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
