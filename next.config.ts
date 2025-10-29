import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build autonome minimal pour déploiement sans dépendances globales
  output: "standalone",
};

export default nextConfig;
