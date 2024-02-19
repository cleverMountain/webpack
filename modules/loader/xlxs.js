const xlsx = require('xlsx');
const fs = require('fs');
module.exports = function (source) {
  const bufferData = fs.readFileSync(this.resourcePath);
  const workbook = xlsx.read(bufferData, { type: 'buffer' });
  // 在这里你可以编写自定义的处理逻辑
  // 例如，将 Excel 数据转换为 JSON 格式
  const result = {};
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    result[sheetName] = xlsx.utils.sheet_to_json(sheet);
  });
  console.log(workbook)
console.log(result)
  return `
 module.exports = ${JSON.stringify(result)}
 `
}