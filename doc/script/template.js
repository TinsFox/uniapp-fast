/**
 * pages页面快速生成脚本
 * 用法：yarn temp 文件名 [,路径]
 */
const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const tplObj = require(`${__dirname}/../template`);
let question = [
  {
    name: 'name',
    type: 'input',
    message: 'Please enter the name of the page you want to create. ',
    validate(val) {
      if (val === '') {
        return 'Name is required!';
      } else if (tplObj[val]) {
        // TODO:判断是否存在同名页面
        return chalk.red('Template has already existed!');
      } else {
        return true;
      }
    }
  },
  {
    name: 'saneNameDir',
    type: 'confirm',
    message: 'Do you want to create a folder with the same name？',
    suffix: 'default yes',

    validate(val) {
      if (val === '') return 'The url is required!';
      return true;
    }
  }
];

function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

const dirName = process.argv[2];
const dirPath = process.argv[3] || '';

if (!dirName) {
  console.log('文件名不能为空！');
  console.log('示例：yarn temp 文件名 [,路径]');
  process.exitCode = 0;
  return;
}
// TODO:分包
let path = `./src/pages/${dirPath || ''}`;
let service = `${dirPath}.service.js`;
let serviceName = `${firstUpperCase(dirName)}Service`;

// 页面模板
const indexTep = `
<template>
    <view class='container ${dirName}-container'>test</view>
</template>

<script>${dirPath ? `\nimport ${serviceName} from './${dirPath}.service';` : ''}
export default {
    data() {
        return {};
    },
    methods: {
      onLoad(){

      }
    }
};
</script>

<style lang='scss'>
.${dirName}-container {
}
</style>
`;

// 接口请求模板
const serviceTep = `
import { http } from '@/common/request';

class ${serviceName} {
    constructor() {}
}

export default new ${serviceName}();
`;

dirPath && !fs.existsSync(path) && fs.mkdirSync(path); // mkdir $1
process.chdir(path); // cd $1

fs.writeFileSync(`${dirName}.vue`, indexTep);
dirPath && !fs.existsSync(service) && fs.writeFileSync(service, serviceTep); // service
process.exitCode = 0;
