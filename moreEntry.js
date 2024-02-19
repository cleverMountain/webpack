const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: resolve(__dirname, "./moreEntry/main.js"),
    app: resolve(__dirname, "./moreEntry/app.js"),
  },
  output: {
    path: resolve(__dirname, "./more"),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
   
  },
  plugins: [

    new htmlWebpackPlugin({
      template: resolve(__dirname, "./index.html")
    })
  ],
  
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 1111
  }
}