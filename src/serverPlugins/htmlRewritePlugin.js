const { readBody } = require("../utils");

/**
 * 重写 html 模板
 */
const htmlRewritePlugin = ({ app, root }) => {
  // 插入 process 变量
  const injectScript = `
    <script type="text/javascript">
      window.process = {}
      process.env = {
        NODE_ENV: "development"
      }
    </script>
  `;

  console.log("htmlRewritePlugin ===> running...");

  // 还可插入 hmr（热更新）脚本

  app.use(async (ctx, next) => {
    await next();

    if (ctx.response.is("html")) {
      const html = await readBody(ctx.body);

      ctx.body = html.replace(/<head>/, `$&${injectScript}`);
    }
  });
};

module.exports = htmlRewritePlugin;
