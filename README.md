# vue-template

> vue初始化项目模板，包含build，deploy，mock

### Build Setup

``` bash
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

2. 测试和生产环境需要相应配置 `config/index.js` 文件，assetsPublicPath字段

3. 项目部署测试和生产环境需要配置 `config/deploy.js` 文件 `deploy` 字段

4. 雪碧图区分px 和 rem两种格式，rem二倍图，font-size为100px为基准，可设置

### License

[MIT](http://opensource.org/licenses/MIT)
