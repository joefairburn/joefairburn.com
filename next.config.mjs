/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "i.scdn.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
