<template>
  <Transition name="sidebar">
    <section v-if="!global.isSidebarHide" class="layout-sidebar">
      <el-scrollbar>
        <el-menu
          :default-active="defaultActive"
          :collapse="global.isSidebarCollapsed"
        >
          <sidebar-menu-item
            v-for="(item, index) in menuList"
            :key="item.path || index"
            :item="item"
            :full-path="item.path"
          />
        </el-menu>
      </el-scrollbar>
      <el-button
        link
        :icon="global.isSidebarCollapsed ? 'ArrowRight' : 'ArrowLeft'"
        class="important-h-40"
        @click="toggleCollapse"
      ></el-button>
    </section>
  </Transition>
  <!-- 侧边栏菜单隐藏时的菜单按钮 -->
  <Transition name="menu">
    <div v-if="global.isSidebarHide" class="btn-menu-hide" @click="isDrawerShow = !isDrawerShow">
      <el-icon><Expand /></el-icon>
    </div>
  </Transition>
  <!-- 侧边栏菜单隐藏时的菜单抽屉 -->
  <el-drawer
    v-model="isDrawerShow"
    direction="ltr"
    :with-header="false"
    class="important-w-auto"
  >
    <el-scrollbar>
      <el-menu :default-active="defaultActive">
        <sidebar-menu-item
          v-for="(item, index) in menuList"
          :key="item.path || index"
          :item="item"
          :full-path="item.path"
          @to-page="isDrawerShow = false"
        />
      </el-menu>
    </el-scrollbar>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useGlobalStore } from '@/stores'
import { useRouter } from 'vue-router'
import SidebarMenuItem from './sidebar-menu-item.vue'
import type { RouteItem } from '@/router'

const global = useGlobalStore()
const router = useRouter()
const isDrawerShow = ref(false) // 控制菜单抽屉显隐
const defaultActive = ref('/home') // 默认激活的菜单
const menuList = ref<RouteItem[]>([]) // 菜单列表

// 监听侧边栏是否隐藏，若显示则关闭菜单抽屉
watch(
  () => global.isSidebarHide,
  (newVal) => {
    if (!newVal) isDrawerShow.value = false
  }
)

// 侧边栏折叠展开事件
function toggleCollapse() {
  global.setSidebarCollapse(!global.isSidebarCollapsed)
}

onBeforeMount(() => {
  global.setSidebarCollapse(global.getSidebarCollapse())

  // 初始化菜单
  const routes = (router.options.routes?.[0].children || []) as RouteItem[]
  menuList.value = routes.filter(item => !item.hidden)

  // 设置默认激活的菜单
  defaultActive.value = router.currentRoute.value.path || '/home'
})
</script>

<style scoped lang="scss">
.layout-sidebar {
  height: calc(100% - var(--el-header-height));
  position: fixed;
  left: 0;
  top: var(--el-header-height);
  display: flex;
  flex-direction: column;
  max-width: var(--el-aside-width, 200px);
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
  background-color: var(--el-bg-color);
  z-index: 2;
  &-scroll {
    flex: 1;
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: max-width .3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  max-width: 0;
}

.btn-menu-hide {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: var(--el-box-shadow-dark);
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: var(--el-bg-color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  .el-icon {
    font-size: 22px;
    transition: color .1s linear;
  }
  &:hover .el-icon {
    color: var(--el-color-primary);
  }
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity .3s ease;
  transition-delay: .3s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
