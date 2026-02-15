/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
  // NOTE: Next.js 16+ no longer supports `eslint` config in next.config.js.
};

export default nextConfig;
