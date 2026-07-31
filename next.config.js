/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allow local asset handling without external image optimization service restrictions
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pages/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pages/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/gallery.html',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/pages/patient-info.html',
        destination: '/patient-info',
        permanent: true,
      },
      {
        source: '/pages/blog.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/pages/infertility.html',
        destination: '/infertility',
        permanent: true,
      },
      {
        source: '/pages/infertility/:slug.html',
        destination: '/infertility/:slug',
        permanent: true,
      },
      {
        source: '/pages/infertility/:slug',
        destination: '/infertility/:slug',
        permanent: true,
      },
      {
        source: '/pages/treatments/:slug.html',
        destination: '/treatments/:slug',
        permanent: true,
      },
      {
        source: '/pages/treatments/:slug',
        destination: '/treatments/:slug',
        permanent: true,
      },
      {
        source: '/blogs/:slug.html',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/location-pages/:slug.html',
        destination: '/locations/:slug',
        permanent: true,
      },
      {
        source: '/location-pages/:slug',
        destination: '/locations/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
