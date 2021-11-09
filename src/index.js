const Koa = require('koa')
const { staticPlugin, moduleRewritePlugin } = require('./plugins')

const createServer = () => {
  // 创建一个 koa 实例
  const app = new Koa()
  const root = process.cwd() // 当前工作目录

  // console.log('root: ', root) // xxx/sure-vite
  const ctx = {
    app,
    root 
  }
  // 中间件 / 插件
  const resolvePlugins = [
    /* 2. 解析 import，重写模块路径 */
    moduleRewritePlugin,
    /* 1. 实现静态服务 */
    staticPlugin
  ]
  
  resolvePlugins.forEach(plugin => plugin(ctx))

  return app
}

module.exports = createServer