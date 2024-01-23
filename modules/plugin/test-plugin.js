/**
 * 1.webpack加载webpack.config.js中所有的配置时，
 * 2.执行开始后会创建compiler对象(有各种钩子函数)
 * 3.遍历所有插件的apply方法，触发各个hooks函数
 * 4.执行剩下编译流程
 */

class TestPlugin {
  constructor() {

  }
  apply(compiler) {
    // environment 开始环境的钩子
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('environment 开始运行')
    })
    // run 开始构建
    compiler.hooks.run.tap('TestPlugin', (compiler) => {
      console.log('run 开始构建')
    })
    // compilation 创建compilation对象，包含一次资源完整的构建过程
    compiler.hooks.compilation.tap('TestPlugin', (compilation, compilationParams) => {
      console.log('compilation对象创建')
    })
    // ompilation 结束之前执行 make是异步并行钩子
    compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('make1111')
        console.log(callback)
        callback()
      }, 2000)
    })
   
    compiler.hooks.make.tap('TestPlugin', (compilation, cb) => {
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('compilation只有在make阶段处理')
      })
    })
    // emit 输出asset到output目录之前执行 异步串行钩子
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      console.log('emit运行')
    })
    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('emit2 async')
        callback()
      }, 2000)
    })
  }
}

module.exports = TestPlugin