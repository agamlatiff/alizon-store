import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "fgnvdauhqbwuhglzfyoi.supabase.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },

  serverActions: {
    bodySizeLimit: "10mb",
  },
};

export default nextConfig;
