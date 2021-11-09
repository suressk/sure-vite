const { readBody, rewriteImports } = require('../utils')

/**
 * 重写模块路径中间件
 */
const moduleRewritePlugin = ({app, root}) => {

  app.use(async (ctx, next) => {
    // 洋葱🧅模型
    // 先执行 next，静态服务中间件会将结果放置于 ctx.body 中（文件流）
    // 方便此中间件获取
    await next();

    if (ctx.body && ctx.response.is('js')) {
      const content = await readBody(ctx.body) // 读取文件流，返回字符串内容

      // console.log('重写模块路径 plugin ==> ', content)
      // 重写 import
      const result = rewriteImports(content)

      // 响应重写后的结果 
      ctx.body = result
    }
    
  })
}

module.exports = moduleRewritePlugin