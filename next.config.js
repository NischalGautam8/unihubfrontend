/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  // pwa: {
  //   dest: "public",
  //   register: true,
  //   skipWaiting: true,
  //   // disable: process.env.NODE_ENV === "development",
  // },
};

module.exports = nextConfig;
