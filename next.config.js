/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for Vercel compatibility
  },
}

module.exports = nextConfig

