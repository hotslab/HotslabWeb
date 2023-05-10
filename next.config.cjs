/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: true }
}

module.exports = nextConfig

// const removeImports = require('next-remove-imports')()
// // import removeImports from 'next-remove-imports'
// module.exports = removeImports({
//   reactStrictMode: true,
//   experimental: { esmExternals: true }
// })