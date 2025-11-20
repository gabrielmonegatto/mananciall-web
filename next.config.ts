import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignora erros de TypeScript durante o build (pra não travar por tipagem)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignora erros de ESLint (estilo de código)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
