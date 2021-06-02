# uniapp-template

## 简介

这是一个uniapp的开发脚手架，目标是达成开箱即用。免去封装各类工具的烦恼.

## 目录结构

```

├── doc/
    ├── shell/                     // shell 脚本
├── publish/
└── src/
    ├── assets/                    // 静态资源目录
    ├── common/                    // 通用类库目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── pages/                     // 页面组件目录
    ├── App.vue
    ├── env.js                     // 环境配置文件
    ├── main.js
    ├── manifest.json
    ├── pages.json                 // 路由注册文件
    ├── setting.js                 // 默认配置文件
    ├── uni.scss                   // 全局 scss 文件 
├── tests/                         // 单元测试目录
├── tsconfig.json                  // TypeScript 配置文件
├── vue.config.js              // webpack 配置文件
└── package.json

```

## 快速上手

```bash
# 克隆项目
git clone git@github.com:TinsFox/uniapp-fast.git

# 进入目录
cd uniapp-fast

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 提交代码
git cz

```

## 特性

1. 使用[luch-request](https://www.quanzhan.co/luch-request/guide/3.x/) 作为请求库，完善微信小程序的无感知登陆
2. 使用[Vuex](https://vuex.vuejs.org/) 存储状态信息
3. 使用 [shelljs](https://github.com/shelljs/shelljs) 集成常用的脚本
4. 使用ES6 的Class 统一管理API
5. 使用[uni-simple-router](https://hhyang.cn/v2/) 作为路由跳转工具
6. 集成[lodash](https://www.lodashjs.com/)
7. 引用[miniprogram-api-promise]()

## TODO

-[x] 二次封装`luch-request`，实现**微信小程序**无感知登陆/无痛刷新 -[] 封装分页数据网络请求
-[x] 配置url名单
-[x] 全局配置文件
-[x] 环境变量配置
-[x] 配置`uniapp-simple-reoutr`
-[ ] 脚本
  -[x] 使用npm钩子启动微信开发工具
  -[ ] 自动完成依赖安装
  -[x] 自动使用微信开者工具打开项目
  -[ ] 发布体验/生产版本，并上传到小程序服务器
  -[ ] 新建页面
  -[ ] 根据`src/router` 结构生成`src/pages.json`
  
