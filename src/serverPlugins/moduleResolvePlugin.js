const fs = require("fs").promises;

const { resolveVueCompiler: resolveVue } = require("../utils/resolveVue");

const moduleReg = /^\/@modules\//;

/**
 * 处理 /@modules/ 路径请求的文件
 * @param {*} param0
 */
const moduleResolvePlugin = ({ app, root }) => {
  // 根据当前运行 sure-vite 命令的目录，解析模块儿映射表
  // const moduleResolved = resolveModule(root);

  const vueResolved = resolveVue(root);

  app.use(async (ctx, next) => {
    if (!moduleReg.test(ctx.path)) {
      return next();
    }

    const moduleName = ctx.path.replace(moduleReg, "");

    // ctx.type = "text/javascript";
    ctx.type = "js";

    const content = await fs.readFile(vueResolved[moduleName], {
      encoding: "utf-8",
    });

    // 返回读取到的结果
    ctx.body = content;
  });
};

module.exports = moduleResolvePlugin;
