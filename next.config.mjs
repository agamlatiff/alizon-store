/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sjogvrmjqnlvzjnlleni.supabase.co",
      },
    ],
  },
};

export default nextConfig;
