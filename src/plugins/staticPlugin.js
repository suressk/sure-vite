const KoaStatic = require('koa-static')
const path = require('path')

const staticPlugin = (ctx) => {
  const { app, root } = ctx
  console.log('root ===> ', root)
  app.use(KoaStatic(root))
  app.use(KoaStatic(path.join(root, 'public')))
}

module.exports = staticPlugin