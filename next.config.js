/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['app-gestion-stock-storage-3b51b73d170249-staging.s3.us-east-1.amazonaws.com'],
    loader: "default",
  },
}

module.exports = nextConfig
