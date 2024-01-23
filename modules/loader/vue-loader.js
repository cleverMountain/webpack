function vueLoader(source) {
  const obj = {
    template: source
  }
  return `
  module.exports = ${JSON.stringify(obj)}
  `
}

module.exports = vueLoader