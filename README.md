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


## treeshaking
1. 对代码进行静态分析，去除不适用的代码



## 提高webpack打包速度  分包策略 压缩代码(css与js) cdn静态资源  import按需加载

为什么使用webpack

webpack的常用配置项

devtool项的值一般有哪些

source-map的原理（重点）

module，chunk和bundle的区别联系

webpack的工作流程

webpack热更新原理

plugin和loader的区别

如何优化webpakc 的打包速度

如何减少webpack的打包体积

splitechunk配置项细节

常用loader，plugin

hash，chunkhash，contenthash的区别

tree shaking原理

babel的原理和工作流

loader的原理和代码实现

plugin的原理和代码实现

webpack中提取公共模块的方法

mainfest文件的作用是什么

less-loader的底层原理

webpack5的新特性

webpack做多页面打包的思路

错误信息上报如何用webpack处理，监听webpack生命周期钩子函数，进行webpack打包过程中错误信息的收集

webpack中做代理

webpack长缓存优化

动态导入、按需加载原理

webpack文件监听的原理（轮询），开启方式