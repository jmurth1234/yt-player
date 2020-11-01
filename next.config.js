const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.ANALYZE,
})

const withPreact = require('next-plugin-preact')
const composePlugins = require('next-compose-plugins')

module.exports = composePlugins([withBundleAnalyzer, withPreact], {
  webpack: (config, { webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FLUENTFFMPEG_COV': false,
        'process.env.IS_NOW': process.env.IS_NOW,
      })
    )
    return config
  },
  images: {
    domains: ['placehold.it', 'ytimg.com', 'i.ytimg.com'],
  },
})
