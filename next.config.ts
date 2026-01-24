import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    // Minimum cache TTL (TTL) in seconds
    minimumCacheTTL: 60,
  },
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // Turbopack for faster builds (already enabled by default in Next.js 16)
  },
  // Development settings
  allowedDevOrigins: ['*'],
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  // Output optimization
  output: 'standalone',
  // Performance hints
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Empty turbopack config to avoid webpack warning
  turbopack: {},
};

export default withNextIntl(nextConfig);
