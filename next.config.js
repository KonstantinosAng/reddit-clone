/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  basePath: "/reddit",
  compress: true,
  images: {
    domains: ["avatars.dicebear.com"],
  },
}
