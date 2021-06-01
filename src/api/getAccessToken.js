import Request from '@/utils/luch-request/index.js';
import {
  API_URL
} from '@/env';
import ApiEnum from '@/api/api-enum';

const refreshRequest = new Request();
let lock = false;
let promiseResult = [];

/**
 * 获取访问令牌
 * @param url
 * @param code
 * @returns {Promise<unknown>}
 */
export function getAccessToken(url, code) {
  return new Promise((resolve, reject) => {
    promiseResult.push({
      resolve,
      reject
    });
    if (!lock) {
      lock = true;
      let form = {
        js_code: code
      };
      refreshRequest.post(`${API_URL}${ApiEnum.accessToken}`, form).then(res => {
        let { code, data } = res.data;
        if (code === 200) {
          resolve(data);
        }
        while (promiseResult.length) {
          promiseResult.shift().resolve(res.data);
        }
        8;
        lock = false;
      }).catch(err => {
        while (promiseResult.length) {
          promiseResult.shift().reject(err);
        }
        lock = false;
      });
    }
  });
}
