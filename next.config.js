/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["leonardo.osnova.io", "res.cloudinary.com"],
  },
};
