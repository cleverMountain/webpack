class CleanPlugin {
  apply(compiler) {
    // 1. 获取路径
    const outPath = compiler.options.output.path

    const fs = compiler.outputFileSystem
    // 应该使用同步钩子，做完这件事后，才能继续做下一件事
    compiler.hooks.emit.tap('CleanPlugin', (compilation) => {
      // 2.删除文件
      this.removeFilse(fs, outPath)
    })
  }
  removeFilse(fs, filePath) {
    // 2.通过路径获取所有文件
    const files = fs.readdirSync(filePath)
    // 3.删除文件(删除文件夹前需要删除所有文件)
    files.forEach(file => {
      // 4.判断文件类型如果是文件直接删除
      const path = `${filePath}/${file}`
      const fileType = fs.statSync(path)
      if (!fileType.isDirectory()) {
        fs.unlinkSync(path)
      } else {
        this.removeFilse(fs, path)
      }
    })
  }
}

module.exports = CleanPlugin