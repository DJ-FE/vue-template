var fs = require('vinyl-fs')
var ftp = require('vinyl-ftp')
var config = require('./config')
var deployEnv = JSON.parse(process.env.npm_config_argv).remain[0] || 'test'
var _ = require('lodash')
let chalk = require('chalk')

if (!config['deploy'] || !_.isPlainObject(config['deploy'])) {
  console.log(chalk.red('Deploy: invalid parameters'))
  process.exit()
}

var conn = new ftp({
  host: config['deploy'][deployEnv]['host'],
  port: config['deploy'][deployEnv]['port'],
  user: config['deploy'][deployEnv]['user'],
  password: config['deploy'][deployEnv]['password'],
  log: logstr
})

fs.src(['./dist/**'], {buffer: false})
    .pipe(conn.dest(config['deploy'][deployEnv]['path']))

function logstr (mode, address) {
  if (address) {
    console.log(mode, address)
  } else {
    console.log(mode)
  }
}
