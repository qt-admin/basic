<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbList"
      :key="item.path"
      :to="{ path: item.path }"
    >{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const breadcrumbList = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>
<style scoped lang="scss">
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  overflow: hidden;
  :deep(.el-breadcrumb__inner.is-link, .el-breadcrumb__inner a) {
    font-weight: 400;
  }
  > span {
    flex-shrink: 0;
  }
}
</style>