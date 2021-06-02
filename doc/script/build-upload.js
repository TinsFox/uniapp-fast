/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
const shell = require('shelljs');
const { PATH, distPath } = require('./constant');
const args = require('minimist')(process.argv.slice(2));
let toolPath = PATH[process.platform];
const currEnv = args['env'] || 'dev';

function buildUpload() {
  const {  npm_package_version } = process.env;
  const description = '脚本测试';
  console.log("process.platform",process.platform)
  shell.exec('yarn run build:mp-weixin');
  shell.exec(` ${toolPath} upload --project ${distPath[currEnv]} -v ${npm_package_version} -d ${description}`);
  console.log('package version', process.env);
}

buildUpload();
