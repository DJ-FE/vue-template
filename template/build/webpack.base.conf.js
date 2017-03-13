var path = require('path')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var spritesmithPlugin = require('webpack-spritesmith')
var spriteTemplate = require('./sprites.conf')
var config = require('./config')
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: process.env.NODE_ENV === 'production' ? config[buildEnv]['assetsRoot'] : config.dev.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config[buildEnv]['assetsPublicPath'] : config.dev.assetsPublicPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      // 'vue$': 'vue/dist/vue.common.js'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [{
      test: /\.vue$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'eslint',
      include: projectRoot,
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  plugins: [
    // sprites
    new spritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, '../src/assets/icons'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/sprite.png'),
        css: [
          path.resolve(__dirname, '../src/style/sprite/_icons.scss'),
          [path.resolve(__dirname, '../src/style/sprite/_iconsrem.scss'), {
            format: 'rem_template'
          }],
          [path.resolve(__dirname, '../src/style/sprite/_iconspx.scss'), {
            format: 'px_template'
          }]
        ]
      },
      customTemplates: {
        'rem_template': spriteTemplate(config.sprite.toRem),
        'px_template': spriteTemplate(config.sprite.toPx)
      },
      apiOptions: {
        cssImageRef: "../../assets/sprite.png"
      },
      spritesmithOptions: {
        padding: 10
      }
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: process.env.NODE_ENV === 'production' ? config[buildEnv]['productionSourceMap'] : config.dev.cssSourceMap
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
