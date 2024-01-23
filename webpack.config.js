const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanPlugin = require("./modules/plugin/clean-plugin")
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
        test: /\.js$/,
        use: [resolve(__dirname, "./modules/loader/clean-log")]
      },
      {
        test: /\.vue$/,
        use: [resolve(__dirname, "./modules/loader/vue-loader")]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    new CleanPlugin(),
    new htmlWebpackPlugin({
      template: resolve(__dirname, "./index.html")
    })
  ],
  mode: 'development',
  devServer: {
    port: 9090
  }
}