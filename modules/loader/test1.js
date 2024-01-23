/**
 * source: 内容
 * map 
 * meta 其它loader传入的参数
 */
module.exports = function (source, map, meta) {
  console.log('test1')
  this.callback(null, source, map, meta)
}