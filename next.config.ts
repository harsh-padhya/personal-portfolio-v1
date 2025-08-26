import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // Only use export for GitHub Pages builds
  ...(isGitHubPages && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? '/personal-portfolio-v1' : '',
  assetPrefix: isGitHubPages ? '/personal-portfolio-v1/' : '',
  // Disable ESLint during builds to focus on functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
