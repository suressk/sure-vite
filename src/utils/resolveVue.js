const path = require("path");

/**
 * 获取 ESModule 规范的 vue 文件
 * @param {*} root 根路径
 * @param {*} name 模块儿名
 * @returns path [string]
 */
const resolveVuePath = (root, name) =>
  path.resolve(
    root,
    "node_modules",
    `@vue/${name}/dist/${name}.esm-bundler.js`
  );

/**
 * 解析 vue 模块儿
 * @param {*} root
 */
const resolveVueCompiler = (root) => {
  // root 为当前命令运行的 根路径
  // vue3 核心模块：
  // runtime-dom runtime-core reactivity shared，在 server 端解析 vue 单文件  compiler-sfc

  // 编译是在 server 端处理的话，这里需要拿到的是 commonjs 规范的文件

  const compilerPkgPath = path.join(
    root,
    "node_modules",
    "@vue/compiler-sfc/package.json"
  );

  // package.json 文件
  const compilerPkg = require(compilerPkgPath);
  // 获取 package.json 的 main 字段对应的文件内容，即：commonjs 规范的 compiler-sfc js文件
  // node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js

  // path.dirname 获取【父路径】 => 此为 package.json 所在文件夹的路径
  const compilerSfcPath = path.join(
    path.dirname(compilerPkgPath),
    compilerPkg.main
  );

  const runtimeCorePath = resolveVuePath(root, "runtime-core");
  const runtimeDomPath = resolveVuePath(root, "runtime-dom");
  const reactivityPath = resolveVuePath(root, "reactivity");
  const sharedPath = resolveVuePath(root, "shared");

  return {
    vueCompilerSfc: compilerSfcPath,
    "@vue/runtime-core": runtimeCorePath,
    "@vue/runtime-dom": runtimeDomPath,
    "@vue/reactivity": reactivityPath,
    "@vue/shared": sharedPath,
    vue: runtimeDomPath,
  };
};

module.exports = {
  resolveVueCompiler,
  resolveVuePath,
};
