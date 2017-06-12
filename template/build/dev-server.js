process.env.NODE_ENV = 'development'
var webpack = require('webpack')
var request = require('request')
var fs = require('fs')
var opn = require('opn')
var path = require('path')
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')
var bodyParser = require('body-parser')
var webpackConfig = require('./baseconfig/webpack.dev.conf')
var config = require('./baseconfig/config')

var proxyTable = config.dev.proxyTable
var port = config.dev.port || '8080'

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// mock data
if (Object.keys(proxyTable).length === 0) {
  var mock = require('./dev-mock')
  var mockDir = path.resolve(__dirname, '../mock')
  fs.readdirSync(mockDir).forEach(function (file) {
    // console.log(file)
    var serve = mock(app)
    var obj = {}
    var mockObj = require(path.resolve(mockDir, file))
    obj[mockObj.api] = mockObj.response
    serve(obj || {})
  })
}
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  opn(uri)
})
