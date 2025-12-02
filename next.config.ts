import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true, // Faster dev restarts with Turbopack caching
  },
};

export default nextConfig;
