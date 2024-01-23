module.exports = function (source) {

  let res = source.replace(/console\.log\((.*)\)/g, "").replace(/debugger/g, '')

  return res
}