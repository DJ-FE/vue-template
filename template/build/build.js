require('shelljs/global')
process.env.NODE_ENV = 'production'

var path = require('path')
var config = require('./config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config[buildEnv]['assetsRoot'], config[buildEnv]['assetsSubDirectory'])
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
