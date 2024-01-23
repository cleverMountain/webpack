
class BannerWebpackPlugin {
  constructor() {

  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('BannerWebpackPlugin', (compilation, cb) => {
      // compilation对象里资源asset对象
      console.log(compilation.assets)
      // cb()
    })
  }
}

module.exports = BannerWebpackPlugin