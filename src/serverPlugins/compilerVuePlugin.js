const { resolveVueCompiler } = require("../utils/resolveVue");
const path = require("path");
const fs = require("fs").promises;

const vueFileReg = /\.vue$/;

// ESModule 默认导出语句
const defaultExportRE = /((?:^|\n|;)\s*)export default/;

/**
 * 编译 .vue 文件（单文件组件）
 * compiler-sfc
 */

const compilerVuePlugin = ({ app, root }) => {
  app.use(async (ctx, next) => {
    // 请求到为 非.vue 结尾的文件
    // 会报错：ctx.path.endsWidth is not a function
    // if (!ctx.path.endsWidth(".vue")) {
    //   return next();
    // }
    if (!vueFileReg.test(ctx.path)) {
      return next();
    }

    // 编译 .vue 文件
    // 这里默认是相对 root 的相对路径，路径别名暂不处理
    const filePath = path.join(root, ctx.path);
    const fileContent = await fs.readFile(filePath, {
      encoding: "utf-8",
    });

    // const contextObj = require(resolveVueCompiler(root).vueCompilerSfc);
    // console.dir(contextObj);

    // 获取 @vue/compiler-sfc 解析代码
    // const compilerSfcPath = resolveVueCompiler(root).vueCompilerSfc;

    const { parse, compileTemplate } = require(resolveVueCompiler(root)
      .vueCompilerSfc);
    // 解析文件内容
    const { descriptor } = parse(fileContent);

    if (!ctx.query.type) {
      let code = "";

      // js 代码
      if (descriptor.script) {
        const { content } = descriptor.script;
        const replaced = content.replace(defaultExportRE, "$1const __script =");
        code += replaced;
      }

      // template
      if (descriptor.template) {
        // 添加请求类型
        const templateRequest = ctx.path + "?type=template";
        code += `\nimport { render as __render } from ${JSON.stringify(
          templateRequest
        )}`;

        code += "\n__script.render = __render";
      }

      ctx.type = "js";
      code += "\nexport default __script";
      ctx.body = code;
    } else if (ctx.query.type === "template") {
      ctx.type = "js";
      // 获取解析 .vue 文件的 template 部分的内容
      const { content } = descriptor.template;
      // 编译 template 模板语法
      const { code } = compileTemplate({ source: content });

      ctx.body = code;
    }
  });
};

module.exports = compilerVuePlugin;
