### 插件
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

