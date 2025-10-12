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
      {
        protocol: "http",
        hostname: "imgx.parapuan.co",
      },
      new URL(
        "https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2021/06/21/fotojet-21jpg-20210621033857.jpg  "
      ),
    ],
  },

  serverActions: {
    bodySizeLimit: "10mb",
  },
};

export default nextConfig;
