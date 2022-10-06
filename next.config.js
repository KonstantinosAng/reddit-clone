/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  basePath: "/",
  compress: true,
  images: {
    domains: ["avatars.dicebear.com"],
  },
}
