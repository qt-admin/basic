<template>
  <main
    class="layout-main"
    :class="{ 'collapse': global.isSidebarCollapsed, 'hide': global.isSidebarHide }"
  >
    <div class="layout-breadcrumb">
      <breadcrumb-area />
    </div>
    <el-scrollbar>
      <div class="layout-content">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </div>
    </el-scrollbar>
  </main>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores'
import BreadcrumbArea from './breadcrumb-area.vue'

const global = useGlobalStore()

</script>

<style scoped lang="scss">
.layout-main {
  --main-horizontal-padding: 20px;
  --breadcrumb-vertical-padding: 12px;
  padding-top: var(--breadcrumb-vertical-padding);
  padding-left: calc(var(--el-aside-width) + var(--main-horizontal-padding));
  padding-right: var(--main-horizontal-padding);
  min-height: calc(100vh - var(--el-header-height));
  transition: padding .5s ease;
  display: flex;
  flex-direction: column;
  &.collapse {
    --el-aside-width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding)*2);
  }
  &.hide {
    padding-left: 0;
    padding-right: 0;
  }
}
.layout-breadcrumb {
  flex-shrink: 0;
  margin-bottom: var(--breadcrumb-vertical-padding);
  padding-left: var(--breadcrumb-vertical-padding);
}
.layout-content {
  background-color: var(--el-bg-color-overlay);
  padding: 20px;
  min-height: calc(100vh - var(--el-header-height) - var(--breadcrumb-vertical-padding)*2 - 14px);
}
</style>