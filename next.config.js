/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CSS modules
  css: {
    modules: true,
  },
  // Enable asset uploading to Vercel
  asset: true,
  // Enable production optimization
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
