const path = require("path")
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');


const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackIncludeSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin')
const glob = require('glob')
const devMode = process.env.NODE_ENV !== 'production'
const config = require('./config')

module.exports = {
  output: {
    path: config.build.assetsRoot,
    filename: devMode ? 'js/[name].js' : 'js/[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',    //非入口(non-entry) chunk 文件的名称，即按需加载的chunk命名
    hashDigestLength: 7,  //hash长度
    publicPath: devMode ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  performance: {
    hints: false    //如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你。
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        },
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            plugins: [
              devMode ? 'dynamic-import-node' : '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: 
        // ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
        //   use: ['css-loader', 'postcss-loader','sass-loader']
        // })
        [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)(\?.+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:7].[ext]',
            limit: 10000
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[hash:7].[ext]',
            limit: 10000
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'media/[name].[hash:7].[ext]',
            limit: 10000
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new webpack.NamedModulesPlugin(),  //废除 提取的公共模块hash值：将使用模块的路径，而不是数字标识符
    new webpack.HotModuleReplacementPlugin(),
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    // ... 忽略 vue-loader 插件
    new MiniCssExtractPlugin({
      filename: 'css/[contenthash].css',
      chunkFilename: 'css/[contenthash].css',
    }),
    
    // new HtmlWebpackPlugin({
    //   title: 'Caching',
    //   template: './public/index.html',  //缺失template时dist文件不会显示root根节点
    //   //因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
    //  // https://github.com/jantimon/html-webpack-plugin/issues/870
    //   chunksSortMode: 'none'
    // }),
    // new webpack.HashedModuleIdsPlugin(), //废除 提取的公共模块hash值：推荐用于生产环境构建：
    // new ExtractTextPlugin('style.css')

    // 必须放在html-webpack-plugin前面
    // new HtmlWebpackIncludeSiblingChunksPlugin(),

    
  ],
  //提取公共代码
  optimization: {
    // minimizer: [new OptimizeCssAssetsPlugin()]   //压缩并优化css,会导致js不能压缩
    //runtimeChunk 设置为 true, webpack 就会把 chunk 文件名全部存到一个单独的 chunk 中，这样更新一个文件只会影响到它所在的 chunk 和 runtimeChunk，避免了引用这个 chunk 的文件也发生改变。
    runtimeChunk: true,
    // splitChunks: {
    //   chunks: 'all'
    // },
    // minimizer: devMode ? [] : [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     parallel: true,
    //     sourceMap: true
    //   }),
    //   // new OptimizeCSSAssetsPlugin()
    // ]
  }

}