#! /usr/bin/env node

import inquirer from 'inquirer'
import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      name: 'nameValue', // 存下来值的key名
      message: 'set your Project name', // 提示信息
      default: 'my-project',
    },
    {
      type: 'list',
      name: 'modelType',
      choices: ['Vue', 'React', 'Ts only'],
    },
  ])
  .then(answers => {
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    // 目标文件地址
    let originUrl = path.join(dirname, 'templates')

    // 输出文件地址
    let cwdUrl = process.cwd() // 当前项目根目录地址
    
    fs.readdir(originUrl, (err, files) => {
      console.log(files) // [ 'common.css', 'index.html' ]
      if (err) throw err
      files.forEach(file => {
        // 渲染进esj模板 写<% 的地方替换掉
        ejs.renderFile(path.join(originUrl, file), answers).then(data => {
					fs.writeFileSync(path.join(cwdUrl,file),data)
				})
      })
    })
    console.log(answers)
  })

  .catch(err => console.log(err))


  
