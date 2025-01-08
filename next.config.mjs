/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true
      },
      // {
      //   source: '/master/product',
      //   destination: '/coming-soon',
      //   permanent: true
      // },
      // {
      //   source: '/master/team',
      //   destination: '/coming-soon',
      //   permanent: true
      // },
      // {
      //   source: '/master/authorization',
      //   destination: '/coming-soon',
      //   permanent: true
      // },
      // {
      //   source: '/personal-task',
      //   destination: '/coming-soon',
      //   permanent: true
      // },
    ]
  },
};

export default nextConfig;
