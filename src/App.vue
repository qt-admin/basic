<template>
  <el-config-provider :locale="zhCn">
    <el-scrollbar always class="main-scrollbar">
      <router-view />
    </el-scrollbar>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import { onMounted } from 'vue';
import { useGlobalStore } from '@/stores'

const global = useGlobalStore()
onMounted(() => {
  // 初始化配置
  global.initSetting()
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