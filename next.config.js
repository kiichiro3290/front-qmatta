/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
      '@mui/material': {
        transform: '@mui/material/{{member}}',
      },
    },
  },
  reactStrictMode: true,
}

module.exports = nextConfig
