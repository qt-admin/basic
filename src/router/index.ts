import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import commonRoutes from './commonRoutes'
import contentRoutes from './contentRoutes'
import Layout from '@/layout/index.vue'
import { useRouteTagStore } from '@/stores'
import { getToken, nprogress } from '@/utils'

export type RouteItem = RouteRecordRaw & {
  hidden?: boolean;
  meta?: { icon?: string; affixed?: boolean }
}
const { VITE_BASE_URL, VITE_PROJECT_NAME } = import.meta.env
const routes: RouteItem[] = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: contentRoutes
  },
  ...commonRoutes,
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(VITE_BASE_URL),
  routes
})

const whiteList = ['/login', '/regist']
// 路由守卫配置
router.beforeEach((to, from , next) => {
  // 设置标题
  if (to.meta?.title) {
    document.title = `${to.meta.title}${VITE_PROJECT_NAME ? ' - ' + VITE_PROJECT_NAME : ''}`
  }
  
  // 启动顶部进度条
  nprogress.start()

  // 配置白名单
  if (whiteList.includes(to.path)) {
    return next()
  }
  if (!getToken()) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
router.afterEach((to) => {
  // 关闭顶部进度条
  nprogress.close()
  
  // 处理路由标签
  const routeTag = useRouteTagStore()
  routeTag.add((to.meta?.title || '') as string, to.path)
})

export default router
