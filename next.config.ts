import type { NextConfig } from "next";

const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  images: { unoptimized: isStaticExport },
};

export default nextConfig;
