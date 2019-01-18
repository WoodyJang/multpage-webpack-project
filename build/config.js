const path = require('path')
const project = process.env.PROJECT_ENV || 'undefined'

module.exports = {
  dev: {
    NODE_ENV: 'development',
    assetsPublicPath: '/',
  },
  build: {
    NODE_ENV: 'production',
    htmlTemplate: './src/pages/' + project + '/index.html',
    index: path.resolve(__dirname, '../dist', project, 'index.html'),
    assetsRoot: path.resolve(__dirname, '../dist', project),
    assetsSubDirectory: '',
    assetsPublicPath: './',
  }
}