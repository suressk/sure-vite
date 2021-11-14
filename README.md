# <div align="center">sure-vite</div>

> 使用 Koa 框架来启动一个服务 <br/>
> 进行语法解析与编译

> 初步使用 js 编写，后面再用 ts 重构完善一下

## 简单示例运行

1. install dependencies

> `yarn` or `npm install`

2. link the `sure-vite` to be a global command (just link this package to the your computer global `node_modules` directory). Must be in **`sure-vite` project package directory (this root directory)**

> `npm link` or the alias: `npm ln`

> if you want to remove the `sure-vite` command<br/>
> use it: `npm unlink sure-vite`

3. install the template project dependencies

> `cd template/vite-vue-pro` and `yarn`

4. run the demo

> `yarn start` ➡️ Actually running `sure-vite` (you can see it in the package.json file)

5. open the server link in your browser

> http://localhost:8000

Then, you can see the simple vue3 project running with my command: `sure-vite`, but not `vite`.
