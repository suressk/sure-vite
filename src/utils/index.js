const { parse } = require('es-module-lexer') // 语法解析 => ast 语法树

/**
 * 读取文件流
 */
const readBody = stream => {

  return new Promise(resolve => {
    let res = ''
    // 读取流会不断触发
    stream.on('data', data => {
      res += data
    })
  
    // 读取完毕
    stream.on('end', data => {
      resolve(res)
    })
  })
}

/**
 * 重写 import 语法
 */
const rewriteImports = (source) => {
  const imports = parse(source) // 解析 import 语法

  console.log('语法解析： ', imports)
}

module.exports = {
  readBody,
  rewriteImports
}