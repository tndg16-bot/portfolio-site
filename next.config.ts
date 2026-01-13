import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['your-portfolio-url.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-portfolio-url.vercel.app',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  allowedDevOrigins: ['*'],
};

export default nextConfig;
