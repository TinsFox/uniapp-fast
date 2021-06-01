'use strict';
const path = require('path');
const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath', 'meta']
          });
          return JSON.stringify(tfPages.routes);
        }, true)
      })
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@pages', resolve('src/pages'))
      .set('@common', resolve('src/common'))
      .set('@api', resolve('src/api'))
      .set('@static', resolve('src/static'))
      .set('@store', resolve('src/store'))
      .set('@style', resolve('src/style'))
      .set('@utils', resolve('src/utils'))
      .set('@components', resolve('src/components'));
  }
};
