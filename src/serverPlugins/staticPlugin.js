const KoaStatic = require("koa-static");
const path = require("path");
const chalk = require("chalk");

const staticPlugin = (ctx) => {
  const { app, root } = ctx;
  console.log("\n✨ Server Runtime Root is: ", chalk.cyan.bold(root));
  app.use(KoaStatic(root));
  app.use(KoaStatic(path.join(root, "public")));
};

module.exports = staticPlugin;
