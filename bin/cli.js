#! /usr/bin/env node

// 可执行的脚本
const chalk = require("chalk");
// const dayjs = require("dayjs");
// 解析命令行参数
const { program } = require("commander");
// 交互式命令
const inquirer = require("inquirer");
// 终端加载效果
const ora = require("ora");
// 下载 github 仓库代码
const downloadGitRepo = require("download-git-repo");

const { logSuccess, logError } = require("../src/utils/log");

console.log(process.argv);

program
  .command("create <projectName>")
  .description("create a new project")
  .alias("c")
  .option("-r, --react", "react template")
  .option("-v2, --vue2", "vue2 template")
  .option("-v3, --vue3", "vue3 template")
  .action((projectName, options) => {
    console.log(chalk.dim(projectName), options);
    inquirer
      .prompt([
        {
          type: "list",
          name: "FrameTemplate",
          message: "choose a framework",
          choices: ["React", "Vue2", "Vue3"],
        },
      ])
      .then((answer) => {
        console.log(answer);
        const spinner = ora();
        spinner.text = "download the template...\n";
        spinner.start();
        downloadGitRepo(
          "github:suressk/react-pro",
          projectName,
          { clone: true },
          (err) => {
            if (err) {
              spinner.fail("Template download failed");
              logError(err);
            } else {
              spinner.succeed("Download successfully");
              logSuccess("Project initialization completed");
            }
          }
        );
      })
      .catch((error) => {
        logError(error);
      });
  });

program.version("1.0.0").parse(process.argv);
