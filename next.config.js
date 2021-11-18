/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['fontmeme.com', 'raw.githubusercontent.com']
  },
  pwa: {
    runtimeCaching,
    dest: 'public',
    buildExcludes: [/middleware-manifest\.json$/]
  }
});
