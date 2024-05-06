// 通用路由：没有侧边栏和标题栏的页面

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/page-common/login/login.vue'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/page-abnormal/404.vue'),
    hidden: true,
    meta: {
      title: '未找到当前页面'
    }
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/page-abnormal/401.vue'),
    hidden: true,
    meta: {
      title: '当前页面未授权'
    }
  }
]

export default routes