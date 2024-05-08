<template>
  <div v-if="store.routeTags.length" class="layout-tabbar">
    <el-scrollbar
      ref="scrollbarRef"
      class="tabbar-scrollbar"
      @wheel.prevent="handleWheel"
      @scroll="handleScroll"
    >
      <ul class="tabbar-list">
        <li
          v-for="(item, index) in store.routeTags"
          :key="item.path"
          ref="tagRouteRef"
          class="tabbar-item"
          :class="{ 'active': item.path === curPath }"
          @click="handleClick(item.path)"
          @click.right.prevent="handleContextMenuShow(index)"
        >
          <span>{{ item.title }}</span>
          <el-icon v-if="item.closeable" @click.stop="handleContextMenuRemove(index)"><Close /></el-icon>
        </li>
      </ul>
    </el-scrollbar>
  </div>
  <!-- 路由标签右键上下文菜单 -->
  <context-menu
    v-model:visible="contextMenu.show"
    :position="{
      x: contextMenu.x,
      y: contextMenu.y
    }"
    :item="store.routeTags[contextMenu.index || 0]"
    :current-index="contextMenu.index"
  />
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteTagStore, useGlobalStore } from '@/stores'
import { ElScrollbar } from 'element-plus';
import ContextMenu from './context-menu.vue'

const store = useRouteTagStore()
const global = useGlobalStore()
const router = useRouter()
const curPath = computed(() => {
  return router.currentRoute.value.path || store.routeTags?.[0]?.path
})
const tagRouteRef = ref<HTMLElement[]>([])
const contextMenu = reactive({
  show: false,
  index: null as (number | null),
  x: 0,
  y: 0
})

// 处理鼠标右键事件
function handleContextMenuShow(index: number) {
  const dom = tagRouteRef.value[index].getBoundingClientRect()
  const x = dom.left
  const y = dom.top + dom.height + 6

  if (contextMenu.show && index === contextMenu.index) return
  contextMenu.index = index
  
  if (contextMenu.show) contextMenu.show = false
  contextMenu.x = x
  contextMenu.y = y
  contextMenu.show = true
}

// 移除当前标签的鼠标右键事件
function handleContextMenuRemove(index: number) {
  store.remove(index)
  contextMenu.show = false
}

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const curScrollLeft = ref(0)
// 滑动滚动条
function handleScroll(e: { scrollLeft: number }) {
  curScrollLeft.value = e.scrollLeft
}
// 滑动鼠标滚轮
function handleWheel(e: WheelEvent) {
  const disX = e.deltaY > 0 ? 20 : -20
  scrollbarRef.value!.setScrollLeft(curScrollLeft.value + disX)
}
// 切换标签
function handleClick(path: string) {
  router.push(path)
  global.setActiveMenu(path)
}
</script>
<style scoped lang="scss">
.layout-tabbar {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
  margin-bottom: var(--qt-nav-tabs-margin);
  padding: 0 10px;
}
.tabbar-list {
  display: flex;
  column-gap: 10px;
  position: relative;
}
.tabbar-item {
  height: var(--qt-nav-tabs-height, 26px);
  border-radius: 4px;
  font-size: 12px;
  padding: 0 10px;
  background-color: var(--el-bg-color);
  color: var(--el-text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  column-gap: 6px;
  transition: var(--el-transition-color);
  &:hover, &.active {
    color: var(--el-color-primary);
    > .el-icon {
      color: var(--el-color-primary);
    }
  }
  > .el-icon {
    border-radius: 50%;
    padding: 2px;
    font-size: 16px;
    transition: var(--el-transition-all);
    &:hover {
      background-color: var(--el-color-primary--light-3);
    }
  }
}
</style>