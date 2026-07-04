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
};
export default nextConfig;
