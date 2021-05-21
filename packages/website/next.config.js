const withPWA = require('next-pwa')
module.exports = withPWA({
  trailingSlash: true,
  pwa: { dest: 'public' },
  future: { webpack5: true }
})
