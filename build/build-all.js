const path = require('path')
const execa = require('execa')
const ora = require('ora')
const chalk = require('chalk')

const projectList = require('./project.conf').projectList || []

const buildFile = path.join(__dirname, 'build.js')

for (let entry in projectList) {
  console.log(chalk.magenta('building :', projectList[entry],'\n'))
  const {stdout} = execa.sync('node', [buildFile, projectList[entry]])
  console.log(stdout)
}