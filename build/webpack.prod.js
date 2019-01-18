const path = require("path")
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config')
console.log('config.build.index ', config.build.index)
// 设置project相关变量
const project = process.env.PROJECT_ENV
//设置入口
const entry = {
  index: './src/pages/' + project +'/index.js'
}

module.exports = smp.wrap(merge(common, {
  mode: 'production',
  entry,
  devtool: 'source-map',
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: config.build.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
  ]
}))