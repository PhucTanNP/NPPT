/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@aios/shared-ui", "@aios/api-client", "@aios/ai-client"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
