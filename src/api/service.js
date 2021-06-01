/**
 * 配置请求拦截器与响应拦截器
 */

import Request from '@/utils/luch-request/index.js';
import { getAccessToken } from '@/api/getAccessToken.js';
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP, SUCCESS } from '@/api/code.js';
import { debounce, openSystemSettings } from '@/utils/myUtils.js';
import {
  API_URL
} from '@/env';

const { tokenKey } = require('@/setting');
import store from '@/store/index.js'; //需要引入store

let expireTokenCache = []; // 储存过期的token
const ACCESS_TOKEN_FILEDS = tokenKey; // header 里传accessToken的键名,在setting文件中设置
const http = new Request();
http.setConfig(config => {
  config.baseURL = API_URL;
  config.custom = {
    auth: true
  };
  return config;
});

http.interceptors.request.use(
  async config => {
    /* 请求之前拦截器。可以使用async await 做异步操作 */
    config.header = {
      ...config.header
    };
    if (config.custom.auth) {
      const vuexUser = store.state.user;
      config.header[ACCESS_TOKEN_FILEDS] = vuexUser.accessToken;
      if (!vuexUser.accessToken || Date.now() > vuexUser.expiresIn) {
        try {
          // TODO:可能是使用refresh 发起请求
          const { data, code } = await getAccessToken();
          if (code === SUCCESS) {
            expireTokenCache = [];
            config.header[ACCESS_TOKEN_FILEDS] = data.accessToken;
          } else {
            // 其他情况，可能refreshToken过期了等等，请根据自身逻辑处理
          }
        } catch (e) {
          console.log(e);
          // 可能由于网络原因通过refreshToken 获取accessToken失败了;可以根据自身逻辑处理，我这里直接放弃本次请求，会进入interceptors.response的错误拦截函数
          return Promise.reject(config);
        }
      }
    }

    return config;
  },
  config => {
    return Promise.reject(config);
  }
);

/**
 * 这里我使用了自己的debounce函数，实际项目中我推荐使用loadsh 的debounce函数。当然使用自己debounce函数也没什么问题
 */
const reLaunchLogin = debounce(
  function(mes) {
    uni.showToast({
      icon: 'none',
      title: mes,
      duration: 2100
    });
    uni.reLaunch({
      url: '/pages/login/login'
    });
  },
  1000,
  true
);

const requestInterResErr = debounce(
  function() {
    uni.getNetworkType({
      success: netRes => {
        if (netRes.networkType == 'none') {
          uni.showModal({
            title: '提示',
            content: '暂无网络,是否去设置?',
            confirmText: '去设置',
            success(modalRes) {
              if (modalRes.confirm) {
                /**
                 * iOS App第一次安装启动后，会弹出是否允许联网的询问框，在用户点击同意前，调用联网API会失败
                 */
                openSystemSettings();
              }
            }
          });
        }
      }
    });
  },
  3000,
  true
);

/**
 * 避免进入死循环，重新new一个用于重新发起请求的实例
 */
const againHttp = new Request({
  baseURL: API_URL
});

againHttp.interceptors.request.use(
  config => {
    const vuexUser = store.state.user;
    config.header[ACCESS_TOKEN_FILEDS] = vuexUser.accessToken;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/**
 * 响应拦截器
 */
// 必须使用异步函数，注意
http.interceptors.response.use(
  async response => {
    const serviceCode = response.data.code; // 服务端code
    if (serviceCode === ACCESS_TOKEN_EXP) {
      let accessToken = response.config.header[ACCESS_TOKEN_FILEDS];
      expireTokenCache.push(accessToken);
      if (expireTokenCache.includes(store.state.user.accessToken)) {
        try {
          const { data, code } = await getAccessToken();
          if (code === SUCCESS) {
            // return Promise.resolve(againHttp.middleware(response.config))
            try {
              const localResponse = await againHttp.middleware(response.config);
              return localResponse;
            } catch (e) {
              // 重新获取数据可能因为网络原因获取失败了
              return Promise.reject(e);
            }
          } else {
            // 其他情况，可能refreshToken过期了等等，请根据自身逻辑处理
          }
        } catch (e) {
          console.log(e);
          // 可能由于网络原因通过refreshToken 获取accessToken失败了;可以根据自身逻辑处理，我这里直接放弃本次请求，会进入catch
          return Promise.reject(response);
        }
      } else {
        // 本地的accessToken就是新的，重新发起请求
        console.log('本地的accessToken就是新的，重新发起请求');
        try {
          const localResponse = await againHttp.middleware(response.config);
          return response;
        } catch (e) {
          // 重新获取数据可能因为网络原因获取失败了
          return Promise.reject(e);
        }
      }
    } else if (serviceCode === REFRESH_TOKEN_EXP) {
      // refreshToken 过期了
      reLaunchLogin('请重新登录！');
    }
    console.log(serviceCode);
    // return response.data.data;
    return Promise.resolve(response.data.data);
  },
  response => {
    // 请求错误做点什么。可以使用async await 做异步操作
    console.log(response);
    requestInterResErr();
    return Promise.reject(response);
  }
);

export { http };
