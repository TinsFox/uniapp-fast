/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
/**
 * @description npm执行脚本
 *
 */
const { PATH, distPath } = require('./constant');
let toolPath = PATH[process.platform];
const args = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
const currEnv = args['env'] || 'dev';
const fs = require('fs-extra');

function initializePath() {
  toolPath = PATH[process.platform];
  console.log('当前系统环境是', process.platform);
  console.log('开发工具路径是', toolPath);
  console.log(`文件路径是${distPath[currEnv]}`);
  console.log('环境变量', args['option']);
}

/**
 * 启动微信开发工具
 * @description 存在上次编译结果会先打开上次编译，然后启动开发工具，再次编译监听工程
 * 如果不存在会创建目录，然后拷贝小程序配置文件，启动开发工具打开工程，启动编译工程
 */
function weChatDevTool() {
  fs.exists(distPath[currEnv], function(exists) {
    if (exists) {
      openProject();
    } else {
      fs.mkdirp(distPath[currEnv])
        .then(() => {
          fs.copy(`${process.cwd()}/doc/script/mp-weixin`, distPath[currEnv]).then(() => {
            openProject();
          })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          console.error(err);
        });
    }
  });
}

function openProject() {
  shell.exec(`${toolPath} open --project ${distPath[currEnv]}`);
}

function main() {
  initializePath();
  if (args['option'] === 'openTool') {
    weChatDevTool();
  } else if (args['option'] === 'openProject') {
    openProject();
  }
}

main();
