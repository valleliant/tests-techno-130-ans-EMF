/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Active l'instrumentation pour démarrer le worker au boot
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
