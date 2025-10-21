import type { NextConfig } from 'next';
import redirects from './src/app/taborova-hra/redirects';

const nextConfig: NextConfig = {
  async redirects() {
    return [...redirects];
  },
};

export default nextConfig;
