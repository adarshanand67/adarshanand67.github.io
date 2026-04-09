/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: "export",
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
