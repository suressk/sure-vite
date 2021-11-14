# <div align="center">sure-vite</div>

> Use Koa to start a dev-server <br/>
> Custom middleware for handling parsing and compilation

> Initially use js, then maybe use ts to refactor and improve it

## Simple Demo

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
