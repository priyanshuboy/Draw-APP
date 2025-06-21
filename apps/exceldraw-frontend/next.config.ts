// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
    protocol: 'https',
        hostname: 'excalidraw.nyc3.cdn.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
          {
        protocol: "https",
        hostname: "substackcdn.com",
      },
          {
        protocol: "https",
        hostname: "miro.medium.com", // <- 👈 This is what you need
      }
    ],
  },
};

export default nextConfig;
