#! /usr/bin/env node

// 可执行的脚本
const chalk = require('chalk')
const dayjs = require('dayjs')

const createServer = require('../src')

createServer().listen(8000, () => {
  console.log(
    chalk.cyan('sure-vite running'),
    chalk.bgWhiteBright.redBright(dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss \n')),
    'server: ',
    chalk.green('http://localhost:8000')
  )
})
