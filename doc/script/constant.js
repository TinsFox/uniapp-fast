/* eslint-disable no-alert */

// Disables no-alert for the rest of the file
/**
 * 脚本常量
 */
const path = require('path');

const OS = {
  LINUX: 'linux',
  DARWIN: 'darwin',
  WINDOWS: 'windows'
};
const PATH = {
  darwin: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli',
  windows: '',
  linux: ''
};
const distPath = {
  dev: `${path.resolve(__dirname, '../../')}/dist/dev/mp-weixin`,
  build: `${path.resolve(__dirname, '../../')}/dist/build/mp-weixin`
};
const ENV = {
  DEV: 'dev',
  TEST: 'test',
  PROD: 'PROD'
};
exports.OS = OS;
exports.PATH = PATH;
exports.distPath = distPath;
exports.ENV = ENV;
