/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prolixus.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/subscribe',
        permanent: true,
      },
      {
        source: '/product',
        destination: '/subscribe',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
