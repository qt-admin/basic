<template>
  <el-menu-item
    v-if="!menuList.length"
    :index="fullPath"
    @click="handleToPage"
  >
    <el-icon v-if="item.meta && item.meta.icon">
      <component
        :is="item.meta.icon"
      />
    </el-icon>
    <template #title>
      <span class="sidebar-menu-text">{{ menuName }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else :index="item.path">
    <template #title>
      <el-icon v-if="item.meta && item.meta.icon">
        <component :is="item.meta.icon"/>
      </el-icon>
      <span class="sidebar-menu-text">{{ menuName }}</span>
    </template>
    <sidebar-menu-item
      v-for="(subItem, subIndex) in menuList"
      :key="subItem.path || subIndex"
      :item="subItem"
      :full-path="`${fullPath&&subItem.path?fullPath+'/':''}${subItem.path}`"
      @to-page="emits('to-page')"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteItem } from '@/router'

const emits = defineEmits(['to-page'])
type Props = {
  item: RouteItem,
  fullPath: string
}
const router = useRouter()
const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {} as RouteItem
  },
  fullPath: ''
})
const menuList = computed(() => {
  const list = (props.item.children || []) as RouteItem[]
  return list.filter(item => !item.hidden)
})
const menuName = computed(() => {
  return (props.item.meta?.title || '') as string
})

function handleToPage() {
  if (!props.fullPath || router.currentRoute.value?.path === props.fullPath) return

  router.push(props.fullPath)
  emits('to-page')
}


</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 200px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
  background-color: #fff;
  &-scroll {
    flex: 1;
  }
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: max-width .5s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  max-width: 0;
}

.sidebar-menu-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  width: calc(var(--el-aside-width) - var(--el-menu-icon-width) - var(--el-menu-base-level-padding) - (var(--el-menu-base-level-padding) + var(--el-menu-level)*var(--el-menu-level-padding)));
}
</style>