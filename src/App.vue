<template>
  <el-config-provider :locale="zhCn">
    <el-scrollbar always class="main-scrollbar">
      <router-view />
    </el-scrollbar>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import ResizeObserver from 'resize-observer-polyfill'
import { onMounted } from 'vue';
import { useGlobalStore } from '@/stores'

const global = useGlobalStore()
let resizeObserver
onMounted(() => {
  const dom = document.getElementsByTagName('body')[0]

  resizeObserver = new ResizeObserver((entries, observer) => {
    const w = entries[0].contentRect.width
    // 判断侧边栏是否隐藏
    global.judgeSidebarHide(!!(w < 770))
  })
  resizeObserver.observe(dom)

  // 初始化主题色
  global.changeThemeColor(global.getThemeColor())
})
</script>
<style>
#app {
  background-color: var(--el-bg-color-page);
  height: 100vh;
}
.main-scrollbar > .el-scrollbar__bar {
  z-index: 3;
}
.main-scrollbar > .el-scrollbar__wrap > .el-scrollbar__view {
  height: 100%;
}
</style>