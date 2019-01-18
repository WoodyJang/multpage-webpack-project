const glob = require('glob')
const chalk = require('chalk')


const entries = glob.sync('./src/**/index.js')
let projectList = []

for (const path of entries) {
  const chunkName = path.slice('./src/pages/'.length, -'/index.js'.length)
  projectList.push(chunkName)
}

const checkProject = () => {
  const project = process.env.PROJECT_ENV
  let result = projectList.indexOf(project) === -1
  if(result){
    console.log(chalk.bgRed('参数错误,允许的参数为:', projectList.toString()))
  }
  return result
}

module.exports = {
  checkProject,
  projectList
}