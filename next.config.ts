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
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
