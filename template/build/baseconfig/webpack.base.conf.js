var path = require('path')
var webpack = require('webpack')
var HappyPack = require('happypack');
var postcss = require('postcss');
var utils = require('./utils')
var config = require('./config')
var SpritesmithPlugin = require('webpack-spritesmith');
// vue load config
var vueLoaderConfig = utils.vueLoaderConfig
var isProduction =  process.env.NODE_ENV === 'production'
var buildEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'
var spriteConfig = config.settings.spriteConfig || false
function resolve (dir) {
  return path.join(__dirname, '../..', dir)
}

//init entry page
var entry = {}
var  pages = config.pages
for(var key in pages){
    entry[key] = pages[key].src
}

var webpackConfig = {
    entry:entry,
    output: {
        path: process.env.NODE_ENV === 'production' ? config[buildEnv]['assetsRoot'] : config.dev.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config[buildEnv]['assetsPublicPath'] : config.dev.assetsPublicPath,
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'happypack/loader?id=vue-loader',
            //     options: vueLoaderConfig
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HappyPack({
          id: 'babel-loader',
          threads: 4,
          loaders: [ 'babel-loader' ]
        })
        // new HappyPack({
        //   id: 'vue-loader',
        //   threads: 4,
        //   loaders: [ 'vue-loader' ]
        // }),
        // new HappyPack({
        //   loaders: [{
        //     path: 'vue-loader',
        //     query: {
        //       vueLoaderConfig
        //     }
        //   }]
        // }),
       
    ].concat(utils.getHtmlPlugins()) //webpackhtmlplugin setting
}
// 配置sprite插件
var SpritesmithPluginConfig = (function(){
    if(spriteConfig){
        return new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname,'../../'+ spriteConfig.src.path ),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname,'../../'+ spriteConfig.target.image ),
                css:  path.resolve(__dirname,'../../'+ spriteConfig.target.css )
            },
            retina:spriteConfig.retina,
            apiOptions: {
                cssImageRef: spriteConfig.cssImageRef
            },
            spritesmithOptions: {
                algorithm: 'top-down',
                padding: spriteConfig.padding || 10
            }
        })
    }
})()
if(SpritesmithPluginConfig){
    webpackConfig.plugins.push(SpritesmithPluginConfig)
}
// 获取eslint配置
var getEslintConfig = (function(){
    if(config.settings.enableEslint){
        return {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: "pre",
            include: [resolve('src'), resolve('test')],
            options: {
              formatter: require('eslint-friendly-formatter')// 编译后错误报告格式
            }
        }
    }
})()
if(getEslintConfig && !isProduction ){
    webpackConfig.module.rules.push(getEslintConfig)
}
module.exports = webpackConfig