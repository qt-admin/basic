<template>
  <!-- 标题栏 -->
  <headerbar-area />
  <!-- 侧边导航栏 -->
  <sidebar-area />
  <!-- 内容区域 -->
  <main-area />
  <!-- 设置按钮 -->
  <setting-bubble />
</template>

<script setup lang="ts">
import SidebarArea from './components/sidebar-area/index.vue'
import HeaderbarArea from './components/headerbar-area/index.vue'
import MainArea from './components/main-area/index.vue'
import SettingBubble from './components/setting-bubble.vue'
</script>
