import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repositoryName = "Felis";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath: isProd ? `/${repositoryName}` : "",
  assetPrefix: isProd ? `/${repositoryName}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repositoryName}` : "",
  },
};

export default nextConfig;
