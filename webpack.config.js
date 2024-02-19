const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require("./modules/plugin/clean-plugin")
const miniCssExtractPlugin = require('mini-css-extract-plugin') // css分包
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const os = require('os');
const length = os.cpus().length // 获取核数

module.exports = {
  entry: resolve(__dirname, "./src/main.js"),
  output: {
    path: resolve(__dirname, "./dist"),
    filename: 'js/main.js',
    publicPath: '/'
  },
  module: {
    rules: [

      {
        test: /\.vue$/,
        use: [resolve(__dirname, "./modules/loader/vue-loader")]
      },
      {
        test: /\.xlsx$/,
        use: [resolve(__dirname, "./modules/loader/xlxs")]
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader file-loader
        loader: 'url-loader',
        options: {
          limit: 0.0001 * 1024,
          name: '[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理Html中img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[hash:8].css'
    }), // css分包
    new cssMinimizerWebpackPlugin(), // css压缩
    new CleanPlugin(),
    new htmlWebpackPlugin({
      template: resolve(__dirname, "./index.html")
    })
  ],
  optimization: {
    // js压缩
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
    // 开启treesheking
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: 'all' // 哪些chunk需要优化 async 和 initial
    }
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 9090,
    hot: true
  }
}