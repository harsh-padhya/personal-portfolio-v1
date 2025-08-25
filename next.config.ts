import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/personal-portfolio-v1' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/personal-portfolio-v1/' : '',
};

export default nextConfig;
