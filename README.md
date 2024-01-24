## webpack
1. webpack的常用配置项
entry入口 output输出 module模块 plugins插件 mode模式 devServe开发服务器 optimization优化 devtool开发工具()

2. devtool项的值一般有哪些
- eval：使用eval包裹函数,生成的 Source Map 将映射到源代码的每一行
- cheap-module-source-map：我通常在开发环境下使用，可以映射到源代码具体行
- source-map: 我通常在生产环境下使用，可以映射到具体行和列

3. sourceMap原理
- sourceMap用于生成源文件的映射


4. webpack的工作流程
- 从配置文件的entry出发，Webpack会构建一个依赖图，用于追踪所有模块之间的依赖关系，遇到特定文件格式时使用特定的loader解析文件，通过plugins，生成打包文件

5. treeshaking原理
- 静态分析代码中的模块依赖关系，并删除未使用的代码
- 使用与esModule，esModule是静态导入，而Commonjs是动态导入的
- 打开：在optimization优化项中usedExports设置为true，开发环境下默认打开
```js
  let  optimization = {
      usedExports: true,
   },
```


6. webpack热更新原理(HMR)




7. plugin和loader的区别
- loader用于处理资源文件(如css,js，图片等)，本质上是一个函数
- plugin用于执行各种构建任务，如打包优化、压缩、资源管理，本质上是一个构造函数


8. 常用的loader和plugin
- less-loader css-loader style-loader babel-loader url-loader 
- html-webpack-plugin vue-plugin css-minimizer-webpack-plugin mini-css-extract-plugin


9. loader的原理和代码实现
- loader是一个函数，接受一个源代码为参数
- loader不能是一个箭头函数，因为需要通过this上下文传递参数
- loader同步处理源码的时候必须要有返回值, 返回值必须是一个buffer或者string，异步的需要调用特定的函数
```js
// 异步
module.exports = function (source) {

  let callback = this.async()
  let newSource = source.replace('hello', 'hcc-2-2')
  setTimeout(() => {
    return callback(null, newSource)
  }, 2000)
}
// 同步
module.exports = function (source) {
  console.log(source)
  return source.replace('hello', 'hcc')
}
```

10. plugin的原理和代码实现
1. plugin本质上是一个构造函数，提供apply方法接收compiler对象为参数(compiler 对象中保存着完整的Webpack环境配置有各种钩子函数)。


11. webpack做多页面打包的思路
- entry入口处定义对象即可，一个入口对应一项

### 插件
1. 
1. 同步钩子异步钩子 tap(注册同步和异步钩子) tapPromise tapAsync
2. compiler对象：启动webpack时创建一次 只触发一次
2. compilation对象： 对资源的一次构建，根据自愿可以触发多次

4. emits钩子： 输出资源前


### loader
1.(pre)前置loader  (post)后置loader  (normal)普通loader   (inline)内联loader
     { 
        enforce: 'pre',
        test: /\.vue$/,
        loader: ''
      }

pre > normal > inline > post

2. 同步loader  异步loader
3. rwa laoder 文件butter数据流
4. patch loader  pictch方法会优先执行
[pitchLoader1, pitchLoader2, pitchLoader3]
执行: pitchLoader1.pitch pitchLoader2.pitch pitchLoader3.pitch  pitchLoader3 pitchLoader2 pitchLoader1

module.exports = function() {}
module.exports.pitch = function() {}


## 分包策略
1. 不分包的话，所有代码(包括运行时代码， 第三方库， 业务代码)打包到一个js文件中，导致体积大，首屏加载速度慢
2. 缓存效率低，如果只修改了某个页面，要去重新打包。
3. 分包策略: 对于多入口的项目可以根据entey分包，多入口分包
   异步分包(动态引入import)
4. 代码压缩(css代码压缩cssMinimizerWebpackPlugin，js代码压缩TerserWebpackPlugin webpack内置插件开发环境的默认配置)



## treeshaking （构建体积）
引入库的时候只用到了某些方法，打包某些方法
1. 静态分析代码中的模块依赖关系，并删除未使用的代码
2. 打开：在optimization优化项中usedExports设置为true，开发环境下默认打开
```js
   optimization: {
      usedExports: true,
   },
```

## sourceMap(源代码映射)
1. 生成源文件的映射，一般在开发环境下使用
2. 开发环境一般使用cheap-module-source-map只包含行映射
3. 生产环境下使用source-map，包含行和列


## HMR 热更新 (构建速度)HotModuleReplacement
1. 开发环境下devServer的默认配置hot: true
```js
  devServer: {
    port: 9090,
    hot: 'false'
  }
```


## oneOf
1. onnOf，只让一个rule规则处理，webpack解析各个文件时，会去依次遍历每一个rule规则，当通过test匹配到后会去使用该规则的loade解析文件，但是解析完毕后，还会继续往后匹配rule规则，导致重复匹配，但是wepack的规则是一种rule解析一种相同的文件格式，当匹配到后就不要继续匹配了


## exclude/include
1. 处理js时不处理node_mpdules


## 多进程打包(速度)
1. 使用thread-loader
```js
// 使用的核数不能超过操作系统的核数
const os = require('os');
const length = os.cpus().length // 获取核数
// 配置，一般打包js使用
let rule =  {
            test: /\.js$/,
            use: [
              {
                loader: 'thread-loader',
                options: {
                  threads: length
                }
              }
            ]
          },
```

## 图片压缩


## 多入口打包
1. 件打包生成的文件分割成多个js文件
2. 按需加载js文件 import动态导入
import('./add').then(res)
## 提高webpack打包速度  分包策略 压缩代码(css与js) cdn静态资源  import按需加载

