/**
 * source: 内容
 * map 
 * meta 其它loader传入的参数
 */
module.exports = function (source, map, meta) {
  const callback = this.async()
  setTimeout(() => {
    console.log('test2')
    callback(null, source, map, meta)
  }, 2000)
}