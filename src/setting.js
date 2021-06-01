/**
 * uniapp-fast 配置文件
 */
module.exports = {
  title: 'uniapp-fast',

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  /**
   * 缓存的公共前缀
   * @type string
   */
  cachePrefixKey: 'uniApp-fox',
  /**
   * 缓存中token的前缀名
   */
  tokenPrefixKey: 'token',
  /**
   * 网络请求头中的token 键名
   */
  tokenKey: 'Authorization'
};
