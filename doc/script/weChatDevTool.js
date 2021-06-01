const { OS, PATH, distPath } = require('./constant');
let toolPath = '';
const args = require('minimist')(process.argv.slice(2));
const shell = require('shelljs');
const currEnv = args['env'] || 'dev';

async function initializePath() {
  toolPath = PATH[process.platform];
  console.log('当前系统环境是', process.platform);
  console.log('开发工具路径是', toolPath);
  console.log(`文件路径是${distPath[currEnv]}`);
  console.log('环境变量', args['env']);
}

async function weChatDevTool() {
  shell.exec(`${toolPath} open`);
}

async function devCompiler() {
  console.log('开始编译...');
  shell.exit(`yarn run dev:mp-weixin`);
  await openProject();

}

async function buildCompiler() {
  shell.exit(`yarn `);
  await openProject();
}

async function openProject() {
  shell.exec(`${toolPath} open --project ${distPath[currEnv]}`);
}

/**
 * 主程序入口
 * 1. 设置开发工具、编译文件路径
 * 2. 启动开发者工具
 * 3. 启动编译
 * 4. 打开项目
 */
async function main() {
  await initializePath();
  await weChatDevTool();
  if (args['env'] === 'dev') {
    await devCompiler();
  } else if (args['env'] === 'prod') {
    await buildCompiler();
  }
}

exports.initializePath = initializePath;
exports.weChatDevTool = weChatDevTool;
exports.main = main;
