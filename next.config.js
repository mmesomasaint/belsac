/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.selfridges.com',
      },
    ],
  },
}

module.exports = nextConfig
