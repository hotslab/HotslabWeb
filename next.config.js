/** @type {import('next').NextConfig} */

require("dotenv/config")

const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true },
  compress: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
  }
}

module.exports = nextConfig
