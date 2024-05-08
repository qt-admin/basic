<template>
  <main
    class="layout-main"
    :class="{ 'collapse': global.isSidebarCollapsed, 'hide': global.isSidebarHide }"
    :style="!global.isNavTabsShow ? '--qt-nav-tabs-height: 0px; --qt-nav-tabs-margin: 0px;': ''"
  >
    <breadcrumb-area />
    <nav-tabs v-if="global.isNavTabsShow" />
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
import BreadcrumbArea from '../breadcrumb-area.vue'
import NavTabs from '../nav-tabs/index.vue'

const global = useGlobalStore()

</script>

<style scoped lang="scss">
.layout-main {
  --main-horizontal-padding: 20px;
  padding-top: var(--qt-breadcrumb-margin);
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
.layout-content {
  background-color: var(--el-bg-color-overlay);
  padding: 20px;
  min-height: calc(100vh - var(--el-header-height) - var(--qt-nav-tabs-height) - var(--qt-nav-tabs-margin) - var(--qt-breadcrumb-height) - var(--qt-breadcrumb-margin)*2);
}
</style>