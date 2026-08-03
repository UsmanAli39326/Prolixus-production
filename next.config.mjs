/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'admin.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prolixus.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'prolixus.aa-consultants.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prolixus.de',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
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
      {
        source: '/rewards',
        destination: '/conduct',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
