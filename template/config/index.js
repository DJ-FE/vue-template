var path = require('path')

module.exports = {
  // 测试环境配置
  test: {
    index: path.resolve(__dirname, '../dist/views/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: false,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    styleFilename: 'css/[name].css'
  },
  // 生产环境配置
  prod: {
    index: path.resolve(__dirname, '../dist/views/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: false,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    styleFilename: 'css/[name].[contenthash].css'
  },
  // 本地开发配置
  dev: {
    port: 8080,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  },
  // mock开发配置
  mock: require('./mock.js'),
  // deploy开发配置
  deploy: require('./deploy.js'),
  // 雪碧图配置
  sprite: require('./sprite.js')
}
