var path = require('path')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'
var isProduction =  process.env.NODE_ENV === 'production'

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config[buildEnv]['assetsSubDirectory']
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

var cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize:  'production', //process.env.NODE_ENV ===
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss:generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
exports.cssLoaders = cssLoaders
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
/**
 * vueLoaderConfig
 */
exports.vueLoaderConfig = {
  loaders:cssLoaders({
    sourceMap: isProduction
      ? config[buildEnv]['productionSourceMap']
      : config.dev.cssSourceMap,
    extract: isProduction
  })
}
/**
 * [getHtmlPlugins webpackhtmlplugin setting]
 * @return {[array]} [HtmlWebpackPlugin array]
 */
exports.getHtmlPlugins = function () {
  var pages = config.pages
  var arr = []
  var isProduct = process.env.NODE_ENV === 'production' ? true : false
  for(var key in pages){
    var page =pages[key]
    var chunk = isProduct ? [].concat(page.chunks).concat(['vendor','manifest']) : page.chunks
    arr.push(
      new HtmlWebpackPlugin({
        filename: page.filename,
        template: page.template,
        chunks: chunk,
        inject: true,
        minify: {
        },
        chunksSortMode: 'dependency'
      })
    )
  }
  return arr 
}

