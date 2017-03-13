var path = require('path')
var config = require('./config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config[buildEnv]['productionSourceMap'], extract: true })
  },
  devtool: config[buildEnv]['productionSourceMap'] ? '#source-map' : false,
  output: {
    path: config[buildEnv]['assetsRoot'],
    filename: utils.assetsPath(config[buildEnv]['filename']),
    chunkFilename: utils.assetsPath(config[buildEnv]['chunkFilename'])
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config[buildEnv]['productionSourceMap'],
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config[buildEnv].env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin(utils.assetsPath(config[buildEnv]['styleFilename'])),
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
    })
  ]
})

module.exports = webpackConfig
