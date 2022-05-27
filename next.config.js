/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    domains: ["avatars.dicebear.com"],
  },
}
