#! /usr/bin/env node

// 可执行的脚本
const chalk = require("chalk");
const dayjs = require("dayjs");

const createServer = require("../src");

createServer().listen(8000, () => {
  console.log(
    chalk.cyan("\n✨ sure-vite is running"),
    chalk.bgWhiteBright.redBright(
      dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss \n")
    ),
    "\n✅ server: ",
    chalk.green("http://localhost:8000")
  );
});
