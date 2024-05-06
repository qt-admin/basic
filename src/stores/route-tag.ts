import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import contentRoutes from '@/router/contentRoutes'
import type { RouteItem } from '@/router'

export type RouteTag = {
  path: string,
  title: string,
  closeable?: boolean
}

const useRouteTagStore = defineStore('routeTags', () => {
  const router = useRouter()
  const routesAll = getAffixedRoutes()
  const routeTags = ref<RouteTag[]>(JSON.parse(JSON.stringify(routesAll)))
  const affixedTags = ref<RouteTag[]>(JSON.parse(JSON.stringify(routesAll)))

  // 获取固定的路由标签
  function getAffixedRoutes(): RouteTag[] {
    const routesAll: RouteTag[] = []
    fn(contentRoutes)
    function fn(routes?: RouteItem[], prefix: string = '') {
      if (!routes || !routes.length) return
      for(let i = 0; i<routes.length; i++) {
        const item = routes[i]
        const { affixed, title } = item.meta || {}
        const path = prefix ? `${prefix}/${item.path}`: item.path
        if (affixed && title && path) {
          routesAll.push({
            path,
            title: title as string,
            closeable: false
          })
        }
        fn(item.children, path)
      }
    }
    return routesAll
  }
  
  // 添加标签
  function add(title: string, path: string, closeable: boolean = true) {
    if (!title || !path) return
    if (routeTags.value.some(item => item.path === path)) return
    routeTags.value.push(
      { path, title, closeable }
    )
  }
  // 移除标签
  function remove(index: number) {
    if (!index && index !== 0) return
    if (!routeTags.value[index].closeable) return
    const isCurrent = routeTags.value[index].path === router.currentRoute.value.path
    routeTags.value.splice(index, 1)

    // 如果移除的是当前页标签，则跳转下一页（下一页没有则跳转上一页或根目录）
    if (isCurrent) {
      const nextPath = routeTags.value[index]?.path || routeTags.value[index - 1]?.path || '/'
      router.push(nextPath)
    }
  }
  // 移除全部标签
  function removeAll() {
    routeTags.value = routeTags.value.filter(item => !item.closeable)
    router.push(affixedTags.value[0]?.path || '/')
  }
  // 移除其它标签
  function removeOthers(index: number) {
    const path = routeTags.value[index].path
    if (!path) return
    routeTags.value = routeTags.value.filter((item, idx) => !item.closeable || idx === index)
    router.replace(path)
  }

  return {
    routeTags,
    add,
    remove,
    removeAll,
    removeOthers
  }
})

export default useRouteTagStore