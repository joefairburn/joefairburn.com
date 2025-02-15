/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.scdn.co'], // For Spotify images
  },
  experimental: {
    useCache: true,
    dynamicIO: true
  }
}

export default nextConfig; 