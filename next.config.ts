import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/DroneCourse-LMS' : '',
  assetPrefix: isGithubActions ? '/DroneCourse-LMS' : '',
  trailingSlash: true,
};

export default nextConfig;
