## webpack
1. webpack的常用配置项
entry入口 output输出 module模块 plugins插件 mode模式 devServe开发服务器 optimization优化 devtool开发工具()

2. devtool项的值一般有哪些
- eval：使用eval包裹函数,生成的 Source Map 将映射到源代码的每一行
- cheap-module-source-map：我通常在开发环境下使用，可以映射到源代码具体行
- source-map: 我通常在生产环境下使用，可以映射到具体行和列

3. sourceMap原理
- sourceMap用于生成源文件的映射
将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map
      开发环境：cheap-module-source-map  没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。
      生产环境：source-map

4. webpack的工作流程
- 从配置文件的entry出发，Webpack会构建一个依赖图，用于追踪所有模块之间的依赖关系，遇到特定文件格式时使用特定的loader解析文件，通过plugins，生成打包文件
初始化参数：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所    
               需要的参数
    开始编译：通过合并后的参数得到compiler对象，并加载配置中导入的插件，执行compiler对象的run方法
    确定入口：根据配置文件中的entry找到入口文件
    编译模块：从入口文件触发，调用所有配置的Loader对模块进行处理，再找出该模块依赖的模块，再递归本步骤直到
             所有入口依赖的文件都经过了本步骤的处理
    完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
    输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件
             加入到输出列表，这步是可以修改输出内容的最后机会
    输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler对象并运行run方法
编译：从Entry出发，针对每个Module串行调用对应的Loader去翻译文件的内容再找到该Module依赖的Module，递归地进行编译处理
输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

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
(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面，只刷新你变动的模块
         核心就是服务端向客户端推送更新后的的chunk文件， WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时(通过watch监听到)，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容或者模块(文件列表、hash值)，后该模块再次通过 jsonp 请求，获取到最新的模块代码，之后HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用




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


7.bundle体积监控和分析： webpack-bundle-analyzer 生成 bundle 的模块组成图，显示所占体积


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

