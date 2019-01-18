const chalk = require('chalk')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

const checkProject = require('./project.conf').checkProject

const project = process.argv[2]
if (project) {
  process.env.PROJECT_ENV = project
  console.log(chalk.bgCyan('process.env.PROJECT_ENV -> ', process.env.PROJECT_ENV, '\n'))
  if (checkProject()) {
    return false
  }
} else {
  console.log(chalk.bgRed('ERROR：缺少参数,需指定page'))
  return false
}

const config = require('./config')
const webpackProd = require('./webpack.prod')

const spinner = ora('building for production...').start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if(err) throw err
  webpack(webpackProd,function(err,stats){
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('Build complete.\n'))
  })
})