# vue-template

> vue初始化项目模板，包含build，deploy，mock。依赖于 `vue-cli`

### Build Setup

``` bash
# init project
    vue init DJ-FE/vue-template#vue1.x-webpack1.x mynewproject  
or
    vue init DJ-FE/vue-template#vue2.x-webpack1.x mynewproject  
or
    vue init DJ-FE/vue-template#vue2.x-webpack2.x mynewproject  

# install dependencies
npm install

# mock serve && dev serve
npm run dev

# build for test env
npm run build test

# build for prod env
npm run build prod

# deploy file for test env
npm run deploy test

# deploy file for prod env
npm run deploy prod

```

### deploy

项目部署采用 [vinyl-ftp](https://github.com/morris/vinyl-ftp)

区分 `test` 和 `prod`环境

### 注意

1. 项目编译、部署区分测试和生产环境

2. 项目编译测试和生产环境需要相应配置 `config/index.js` 文件，assetsPublicPath字段

3. 项目部署测试和生产环境需要配置 `config/deploy.js` 文件 `test`、`prod` 字段

4. 雪碧图区默认配置区分px 和 rem两种格式，rem格式以`html`节点 `font-size:100px`为基准

5. 项目模板依赖于 `vue-cli`，安装使用 `npm install -g vue-cli`

### 配置

1. 基本配置：/config/index.js
    
    基本参数配置 ：settings

        dropConsole  是否去掉生产环境console 默认 true

        enableEslint 是否开启eslint 默认true

        spriteConfig 雪碧图配置 ，不需要可置为false
    
    环境配置：dev test prod

3. eslint配置:  /.eslintrc.js 

4. postcss配置: /.postcssrc.js

    插件项：

        postcss-px2rem: {remUnit: 100} 配置px自动转rem ， 单位 100

        autoprefixer: { browsers: ['> 1%', 'IOS 7']} 配置兼容设备浏览器等 

5.  ftp配置: /config/deploy.js

6.  mock配置：/mock

    {
        api : xxx ,
        
        response: {
            ok: {
                code: 0,
                message: '',
                data: {
                }
            }
        }
    }



### License

[MIT](http://opensource.org/licenses/MIT)
