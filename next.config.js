const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE
})

const withCSS = require('@zeit/next-css')
const composePlugins = require('next-compose-plugins')

module.exports = composePlugins([withCSS, withBundleAnalyzer], {
  experimental: { modern: true },
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false,
        'process.env.IS_NOW': process.env.IS_NOW
      })
    )
    return config
  }
})
