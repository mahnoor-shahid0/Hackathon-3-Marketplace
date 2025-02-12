/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      proto : 'https',
      domains: ['cdn.sanity.io', 'image.icons8.com'],
    },
    staticPageGenerationTimeout: 120,
};

export default nextConfig;