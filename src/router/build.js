const fs = require('fs');
const path = require('path');
const router = require('./index.js');

// 将子路由模块配置文件转化为 uniapp 配置文件格式
const buildRouter = route => {
  const res = [];
  const { baseUrl, children } = route;
  console.log('router', router);

  function builder(path, children) {
    if (!children) return;
    children.forEach(page => {
      if (page.children) {
        builder(path + page.path + '/', page.children);
      } else {
        // const obj = {
        //   path: path + page.path,
        //   style: {
        //     navigationBarTitleText: page.title
        //   },
        //   meta: page.meta,
        //   name: page.name,
        //   aliasPath: page.aliasPath
        // };
        const obj = { ...page };
        Object.keys(page).forEach(ii => {
          !['path', 'name'].includes(ii) && (obj.style[ii] = page[ii]);
        });
        res.push(obj);
      }
    });
  }

  builder(baseUrl, children);
  return res;
};
// 自动加载 './pagesA' 目录分包文件
const getSubPackages = () => {
  const srcPath = path.resolve(__dirname, './pagesA');
  const result = fs.readdirSync(srcPath);
  let router = [];
  result.forEach((r) => {
    const route = require('./pagesA/' + r);
    router = [...router, ...buildRouter(route)];
  });
  return [
    {
      root: 'pagesA',
      pages: router
    }
  ];
};

// 自动加载 './modules' 目录子路由配置文件
const getRouter = () => {
  const srcPath = path.resolve(__dirname, './modules');
  const result = fs.readdirSync(srcPath);
  let router = [];
  result.forEach(r => {
    const route = require('./modules/' + r);
    router = [...router, ...buildRouter(route)];
  });
  return router;
};

// 构建 pages
router.pages = getRouter();
// 构建 getSubPackages 分包 并写入pages.json文件
router.subPackages = getSubPackages();
//  并写入 pages.json 文件
fs.writeFile(
  __dirname + '/../pages.json',
  JSON.stringify(router, null, '\t'),
  e => e ? console.error(e) : console.log('pages.json 配置文件更新成功')
);
