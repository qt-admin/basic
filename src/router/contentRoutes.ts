// 内容路由：带有侧边栏和标题栏的内容页面
/**
 * affixed: boolean; 是否固定在路由标签页，固定则无法删除
 */

// 首页路由
const routeHome = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/page-home/home.vue'),
  hidden: false,
  meta: {
    title: '首页',
    icon: 'HomeFilled',
    affixed: true
  }
}

// 数据大屏相关路由
const routeScreen = {
  path: '/screen',
  redirect: '/screen/demo1',
  meta: {
    title: '数据大屏',
    icon: 'Platform'
  },
  children: [
    {
      path: 'demo1',
      name: 'Demo1',
      component: () => import('@/views/page-screen/demo1.vue'),
      meta: {
        title: '大屏模板1'
      }
    }
  ]
}

// 表格相关路由
const routeTable = {
  path: '/table',
  redirect: '/table/table-basic',
  meta: {
    title: '常用表格',
    icon: 'Grid'
  },
  children: [
    {
      path: 'table-basic',
      name: 'TableBasic',
      component: () => import('@/views/page-table/table-basic.vue'),
      meta: {
        title: '基础表格'
      }
    }
  ]
}

// 表单相关路由
const routeForm = {
  path: '/form',
  redirect: '/form/form-basic',
  meta: {
    title: '常用表单',
    icon: 'List'
  },
  children: [
    {
      path: 'form-basic',
      name: 'FormBasic',
      component: () => import('@/views/page-form/form-basic.vue'),
      meta: {
        title: '基础表单'
      }
    }
  ]
}

// echarts图表相关路由
const routeEcharts = {
  path: '/echarts',
  redirect: '/echarts/echarts-bar',
  meta: {
    title: 'echarts图表',
    icon: 'Histogram'
  },
  children: [
    {
      path: 'echarts-bar',
      name: 'EchartsBar',
      component: () => import('@/views/page-echarts/echarts-bar.vue'),
      meta: {
        title: '柱状图'
      }
    },
    {
      path: 'echarts-line',
      name: 'EchartsLine',
      component: () => import('@/views/page-echarts/echarts-line.vue'),
      meta: {
        title: '折线图'
      }
    },
    {
      path: 'echarts-pie',
      name: 'EchartsPie',
      component: () => import('@/views/page-echarts/echarts-pie.vue'),
      meta: {
        title: '饼形图'
      }
    },
    {
      path: 'echarts-radar',
      name: 'EchartsRadar',
      component: () => import('@/views/page-echarts/echarts-radar.vue'),
      meta: {
        title: '雷达图'
      }
    }
  ]
}

// 多级导航相关路由
const routeMultiple = {
  path: '/route',
  redirect: '/route/route-1',
  meta: {
    title: '多级路由',
    icon: 'Menu'
  },
  children: [
    {
      path: 'route-1',
      name: 'Route1',
      component: () => import('@/views/page-route/route-1.vue'),
      meta: {
        title: '一级路由-1'
      }
    },
    {
      path: 'route-2',
      name: 'Route2',
      component: () => import('@/views/page-route/route-2.vue'),
      meta: {
        title: '一级路由-2'
      }
    },
    {
      path: 'route-3',
      redirect: '/route/route-2-1',
      meta: {
        title: '二级路由'
      },
      children: [
        {
          path: 'route-2-1',
          name: 'Route21',
          component: () => import('@/views/page-route/route-2-1.vue'),
          meta: {
            title: '二级路由-1'
          }
        },
        {
          path: 'route-2-2',
          name: 'Route22',
          component: () => import('@/views/page-route/route-2-2.vue'),
          meta: {
            title: '二级路由-2'
          }
        }
      ]
    },
  ]
}

// 异常页面相关路由
const routeAbnormal = {
  path: '/abnormal',
  redirect: '/abnormal/abnormal-404',
  meta: {
    title: '异常页面',
    icon: 'Failed'
  },
  children: [
    {
      path: 'abnormal-404',
      name: 'Abnormal404',
      component: () => import('@/views/page-abnormal/404.vue'),
      meta: {
        title: '404-页面未找到'
      }
    },
    {
      path: 'abnormal-401',
      name: 'Abnormal401',
      component: () => import('@/views/page-abnormal/401.vue'),
      meta: {
        title: '401-未授权'
      }
    },
    {
      path: 'abnormal-offline',
      name: 'AbnormalOffline',
      component: () => import('@/views/page-abnormal/offline.vue'),
      meta: {
        title: '未找到网络'
      } 
    }
  ]
}

// 结果页面相关路由
const routeResult = {
  path: '/result',
  redirect: '/result/success',
  meta: {
    title: '结果页面',
    icon: 'List'
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/page-result/success.vue'),
      meta: {
        title: '成功'
      }
    },
    {
      path: 'fail',
      name: 'Fail',
      component: () => import('@/views/page-result/fail.vue'),
      meta: {
        title: '失败'
      }
    }
  ]
}

// 常用工具相关路由
const routeTool = {
  path: '/tool',
  redirect: '/tool/editor',
  meta: {
    title: '常用工具',
    icon: 'List'
  },
  children: [
    {
      path: 'editor',
      name: 'Editor',
      component: () => import('@/views/page-tool/editor.vue'),
      meta: {
        title: '编辑器'
      }
    },
    {
      path: 'map',
      name: 'Map',
      component: () => import('@/views/page-tool/map.vue'),
      meta: {
        title: '地图'
      }
    },
    {
      path: 'json-format',
      name: 'JSONFormat',
      component: () => import('@/views/page-tool/json-format.vue'),
      meta: {
        title: 'JSON格式化'
      }
    }
  ]
}

// 项目介绍相关路由
const routeProject = {
  path: '/project',
  redirect: '/project/about-us',
  meta: {
    title: '关于项目',
    icon: 'Flag'
  },
  children: [
    {
      path: 'about-us',
      name: 'AboutUs',
      component: () => import('@/views/page-project/about-us.vue'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: 'faq',
      name: 'Faq',
      component: () => import('@/views/page-project/faq.vue'),
      meta: {
        title: '常见问题'
      }
    }
  ]
}

// 其它路由
const routeOthers = [
  {
    path: '/offline',
    name: 'Offline',
    hidden: true,
    component: () => import('@/views/page-abnormal/offline.vue'),
    meta: {
      title: '未找到网络'
    } 
  },
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/views/page-common/personal-center/personal-center.vue'),
    hidden: true,
    meta: {
      title: '个人中心'
    }
  }
]

const routes = [
  routeHome,
  routeScreen,
  routeTable,
  routeForm,
  routeEcharts,
  routeMultiple,
  routeAbnormal,
  routeResult,
  routeTool,
  routeProject,
  ...routeOthers
]

export default routes