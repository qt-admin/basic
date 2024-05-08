<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      :to="{ path: item.path }"
      @click="handleClick(item.redirect as string || item.path)"
    >{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores';

const global = useGlobalStore()
const router = useRouter()
const breadcrumbList = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

function handleClick(path: string) {
  global.setActiveMenu(path)
}
</script>
<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: var(--qt-breadcrumb-height);
  flex-shrink: 0;
  font-size: 12px;
  margin-bottom: var(--qt-breadcrumb-margin);
  padding: 0 10px;
  :deep(.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a) {
    font-weight: 400;
  }
  > span {
    flex-shrink: 0;
  }
}
</style>