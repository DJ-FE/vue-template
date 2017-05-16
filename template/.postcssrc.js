// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": { browsers: ['> 1%', 'IOS 7']},
    'postcss-px2rem':{remUnit: 100}
  }
}
