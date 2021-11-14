const Koa = require("koa");
const {
  staticPlugin,
  moduleRewritePlugin,
  moduleResolvePlugin,
  htmlRewritePlugin,
  compilerVuePlugin,
} = require("./serverPlugins");

const createServer = () => {
  // 创建一个 koa 实例
  const app = new Koa();
  const root = process.cwd(); // 当前工作目录

  // console.log('root: ', root) // xxx/sure-vite
  const ctx = {
    app,
    root,
  };
  // 中间件 / 插件
  const resolvePlugins = [
    /* 5. 重写 html 文件（添加环境变量/添加热更新等功能） */
    htmlRewritePlugin,
    /* 4. 解析 import，重写模块路径，如： vue => /@modules/vue */
    moduleRewritePlugin,
    /* 3. 拦截 /@modules/ 开头的文件请求，重定向到 node_modules 下实际路径的文件 */
    moduleResolvePlugin,
    /* 2. 编译 .vue 单文件 */
    compilerVuePlugin,
    /* 1. 实现静态服务 */
    staticPlugin,
  ];

  resolvePlugins.forEach((plugin) => plugin(ctx));

  return app;
};

module.exports = createServer;
