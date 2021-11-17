/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['fontmeme.com', 'raw.githubusercontent.com']
  },
  pwa: {
    dest: 'public'
  }
});
