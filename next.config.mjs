/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
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

import removeImports from 'next-remove-imports'
export default removeImports(nextConfig)
