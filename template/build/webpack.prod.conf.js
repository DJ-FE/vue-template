var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config[buildEnv]['productionSourceMap'],
      extract: true
    })
  },
  devtool: config[buildEnv]['productionSourceMap'] ? '#source-map' : false,
  output: {
    path: config[buildEnv]['assetsRoot'],
    filename: utils.assetsPath(config[buildEnv]['filename']),
    chunkFilename: utils.assetsPath(config[buildEnv]['chunkFilename'])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath(config[buildEnv]['styleFilename'])
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: config[buildEnv]['index'],
      template: 'index.html',
      inject: true,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true

        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config[buildEnv]['assetsSubDirectory'],
        ignore: ['.*']
      }
    ])
  ]
})

if (config[buildEnv]['bundleAnalyzerReport']) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
