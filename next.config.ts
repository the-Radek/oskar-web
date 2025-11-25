import type { NextConfig } from 'next';
import adminRedirect from '@/app/admin/redirect';
import themedGameRedirect from '@/app/taborova-hra/redirect';

const nextConfig: NextConfig = {
  async redirects() {
    // return [await import('@/app/taborova-hra/redirect').then((mod) => mod.default)];
    return [
      adminRedirect,
      themedGameRedirect,
      {
        source: '/prihlaska',
        destination:
          'https://docs.google.com/forms/d/e/1FAIpQLSfEIT4bl2GNx_M8fPmkToFuHEzBQ3a5OyF55v42VP4Y5cJvIA/viewform',
        permanent: false,
      },
      {
        source: '/soukromi',
        destination: '/',
        permanent: false,
      },
      {
        source: '/podminky',
        destination: '/',
        permanent: false,
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;
