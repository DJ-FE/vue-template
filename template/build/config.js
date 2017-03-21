var path = require('path')
var _ = require('lodash')
var config = require('../config/')

var baseconfig = {
  // 测试环境配置
  test: {
    index: path.resolve(__dirname, '../dist/views/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: false,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    styleFilename: 'css/[name].css',
    bundleAnalyzerReport: false
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
    styleFilename: 'css/[name].[contenthash].css',
    bundleAnalyzerReport: true
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
  mock: {},
  // deploy开发配置
  deploy: {
    test: {
      host: '',
      port: '',
      user: '',
      password: '',
      path: ''
    },
    prod: {
      host: '',
      port: '',
      user: '',
      password: '',
      path: ''
    }
  },
  // 雪碧图配置，分别打出以px和rem为单位
  sprite: {
    toPx: {
      scale: 2,
      unit: 'px'
    },
    toRem: {
      scale: 200,
      unit: 'rem'
    }
  }
}

module.exports = _.merge(baseconfig, config)
