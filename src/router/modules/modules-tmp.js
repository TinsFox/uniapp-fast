module.exports = {
  baseUrl: 'pages/index/',
  children: [
    {
      path: 'index',
      title: '首页',
      'app-plus': { titleNView: { buttons: [{ text: '消息', fontSize: '16px' }] } },
      aliasPath: '/',
      name: 'index',
      meta: {
        name: 'index',
        auth: false
      }
    },
    // { path: 'tobeAcceptedTask', name: '待接受任务' },
    // {
    //   path: 'task',
    //   // 嵌套写法演示
    //   children: [
    //     { path: 'index', name: '任务' },
    //     {
    //       path: 'deliveryMerchant', name: '配送商户',
    //       'app-plus': { titleNView: { buttons: [{ text: '地图模式', fontSize: '14px', width: '76px' }] } }
    //     },
    //     {
    //       path: 'map', name: '地图模式',
    //       'app-plus': { titleNView: false }
    //     },
    //     { path: 'goodsList', name: '商品列表' },
    //     { path: 'receivables', name: '收款' }
    //   ]
    // }
  ]
};
