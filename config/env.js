/**
 *  uniapp-template 全局环境配置文件
 *  @version 0.0.1
 */

//  基础公共路径
const ENV_BASE_URL = {
  development: 'http://localhost:3000',
  production: 'https://example.com'
};
// 路径公共前缀
const ENV_BASE_API_PREFIX = {
  development: '/mock/21/api',
  production: '/api/v1/'
};

const ENV_API_URL = {
  development: `${ENV_BASE_URL.development}${ENV_BASE_API_PREFIX.development}`,
  production: `${ENV_BASE_URL.production}${ENV_BASE_API_PREFIX.development}`
};

export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development'];
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development'];
export const HAS_LIVE = false; //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。

export const IMG_URL = 'https://example.com'; //全局网络图片地址变量，css背景图片地址变量在 style/fast.scss
