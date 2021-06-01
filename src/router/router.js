import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
});
//全局路由前置守卫
// TODO:限制需要进入登陆的页面
router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('to', to.meta);
  console.log('from', from);
  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束');
});

export {
  router,
  RouterMount
};
