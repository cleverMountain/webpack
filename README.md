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