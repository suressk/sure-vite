const { parse } = require("es-module-lexer"); // 语法解析 => ast 语法树
const MagicString = require("magic-string");
const chalk = require("chalk");

/**
 * 读取文件流
 */
const readBody = (stream) => {
  return new Promise((resolve) => {
    let res = "";
    // 读取流会不断触发
    stream.on("data", (data) => {
      res += data;
    });

    // 读取完毕
    stream.on("end", (data) => {
      resolve(res);
    });
  });
};

/**
 * 重写 import 语法
 * 因为浏览器 http 请求无法识别非（/，./，../）开头的文件路径
 * 从而无法请求到文件，请求到（非 js/html 等文件）其实也识别不了
 *
 * 以 vue3 项目为例
 * main.js 中：
 *
 * import { createApp } from 'vue'
 * import App from './App.vue'
 * createApp(App).mount('#app')
 *
 * parse 解析结果为：
 * [
 *   [
 *     { n: 'vue', s: 27, e: 30, ss: 0, se: 31, d: -1, a: -1 },
 *     { n: './App.vue', s: 49, e: 58, ss: 32, se: 59, d: -1, a: -1 }
 *   ],
 *   [],
 *   false
 * ]
 */
const rewriteImports = (source) => {
  const imports = parse(source); // 解析 import 语法
  // console.log("语法解析： ", imports);
  // 结果如上例所示
  // 数组第一项为静态 import 的解析结果
  // 数组第二项为动态 import 的解析结果（此处并无）
  // n 为导入的模块路径，s 为模块名/路径起始下标，e 为模块名/路径结束下标
  const staticImports = imports[0];

  // 有多条静态 import 语法
  if (staticImports.length) {
    // @ts-ignore
    const mString = new MagicString(source);
    // console.log(mString);

    staticImports.forEach((item) => {
      const { s, e, n } = item;
      const modulePath = source.substring(s, e); // 截取 vue， ./App.vue 等路径

      // 非 . 开头路径或 / 开头的路径 => 重写
      if (/^[^\/\.]/.test(modulePath)) {
        mString.overwrite(s, e, `/@modules/${n}`);
      }
    });

    console.log(chalk.cyan("rewrite result: "), mString.toString());
    /* 重写结果如下：
    import { createApp } from '/@modules/vue'
    import App from './App.vue'
    createApp(App).mount('#app')
    */
  }
};

module.exports = {
  readBody,
  rewriteImports,
};
