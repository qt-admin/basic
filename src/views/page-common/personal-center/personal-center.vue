<template>
  <main class="wrap">
    <el-tabs v-if="global.isSidebarHide" v-model="menuActive">
      <el-tab-pane
        v-for="item in menuList"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      />
    </el-tabs>
    <div class="content">
      <section v-if="!global.isSidebarHide" class="aside">
        <ul>
          <li
            v-for="item in menuList"
            :key="item.id"
            class="menu-item"
            :class="{ 'active': item.id === menuActive }"
            @click="menuActive = item.id"
          >{{ item.name }}</li>
        </ul>
      </section>
      <section class="main">
        <personal-data v-if="menuActive === '1'" />
        <account-setting v-if="menuActive === '2'" />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import PersonalData from './components/personal-data.vue'
import AccountSetting from './components/account-setting.vue'
import { useGlobalStore } from '@/stores'

const global = useGlobalStore()
const menuList = [
  { id: '1', name: '个人资料' },
  { id: '2', name: '账号设置' }
]
const menuActive = ref('1')

</script>

<style scoped lang="scss">
.wrap {
  height: calc(100vh - var(--el-header-height) - var(--breadcrumb-vertical-padding)*2 - 14px - 40px);
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  column-gap: 20px;
  flex: 1;
}
.aside {
  width: 140px;
  flex-shrink: 0;
  border-right: 1px solid var(--el-border-color);
  height: 100%;
  padding-right: 10px;
}
.menu-item {
  height: 36px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  padding-left: 12px;
  cursor: pointer;
  margin-bottom: 4px;
  &:hover, &.active {
    background-color: var(--el-menu-hover-bg-color);
    color: var(--el-color-primary);
  }
}
.main {
  flex: 1;
}
</style>