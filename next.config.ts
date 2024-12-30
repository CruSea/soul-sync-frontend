import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // so that profile pictures will show
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
