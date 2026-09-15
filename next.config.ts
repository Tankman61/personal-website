import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for a year. The originals are static assets that
    // never change in place, so a short TTL just forces needless re-optimization
    // and slow loads in production.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
