const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE
})

const withCSS = require('@zeit/next-css')
const composePlugins = require('next-compose-plugins')

module.exports = composePlugins([withCSS, withBundleAnalyzer], {
  experimental: { modern: true }
})
