const path = require("path")
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = glob.sync('./src/**/index.js')
console.log('entries -> ', entries)
let entry = {}
let rewrites = []
let htmlPlugins = []
for (const path of entries) {
  const template = path.replace('index.js', 'index.html')
  const chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)
  const pattern = new RegExp('^\/' + chunkName + '\/*');
  rewrites.push(
    { from: pattern, to: `/${chunkName}/index.html` }
  )
  entry[chunkName] = path
  htmlPlugins.push(new HtmlWebpackPlugin({
    template,
    filename: chunkName + '/index.html',
    chunksSortMode: 'none',
    chunks: [chunkName, `runtime~${chunkName}`],
    inject: true
  }))
}

module.exports = smp.wrap(merge(common, {
  mode: 'development',
  entry,
  // 在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射
  // 但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项；
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // contentBase: "./public",   //本地服务器所加载的页面所在的目录
    contentBase: false,
    // historyApiFallback: true,   //不跳转
    historyApiFallback: {
      rewrites: rewrites
    },
    inline: true,    //实时刷新
    hot: true,
    open: false,
    publicPath: '/',
    proxy: {

    }
  },
  plugins: [
    ...htmlPlugins
  ]
}))