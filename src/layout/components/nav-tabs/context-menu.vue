<template>
  <Transition name="el-zoom-in-center">
    <div
      v-show="isVisible"
      class="el-popper is-pure is-light el-dropdown__popper"
      data-popper-placement="bottom"
      :style="`top: ${position.y}px; left:${position.x}px;`"
    >
      <ul class="el-dropdown-menu">
        <li
          v-for="item in list"
          :key="item.key"
          class="el-dropdown-menu__item"
          @click="handleContextMenuClick(item.key)"
        >
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <span class="el-popper__arrow left-10" />
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouteTagStore, type RouteTag } from '@/stores/route-tag'
import { useRouter } from 'vue-router'

const router = useRouter()
type Props = {
  position: {
    x: number,
    y: number
  },
  visible: boolean,
  item?: RouteTag,
  currentIndex?: number | null
}
const emits = defineEmits(['update:visible'])
const isVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
const props = withDefaults(defineProps<Props>(), {
  position: () => {
    return { x: 0, y: 0 }
  }
})
const list = ref([
  { key: 'refresh', name: '刷新本页', icon: 'RefreshRight' },
  { key: 'close', name: '关闭本页', icon: 'CircleClose' },
  { key: 'closeOthers', name: '关闭其它', icon: 'CircleClose' },
  { key: 'closeAll', name: '关闭所有', icon: 'CircleClose' }
])
const store = useRouteTagStore()

function handleContextMenuClose() {
  emits('update:visible', false)
}
function handleContextMenuClick(key: string) {
  const { item, currentIndex } = props
  switch(key) {
    case 'refresh':
      if (item?.path) {
        router.replace(item.path)
      }
      break;
    case 'close':
      if (currentIndex || currentIndex === 0) {
        store.remove(currentIndex)
      }
      break;
    case 'closeOthers':
      if (currentIndex || currentIndex === 0) {
        store.removeOthers(currentIndex)
      }
      break;
    case 'closeAll':
      if (currentIndex || currentIndex === 0) {
        store.removeAll()
      }
      break;
  }
  handleContextMenuClose()
}

onMounted(() => {
  document.body.addEventListener('click', handleContextMenuClose)
})
onUnmounted(() => {
  document.body.removeEventListener('click', handleContextMenuClose)
})
</script>
<style scoped lang="scss">
.el-dropdown-menu__item {
  font-size: 12px;
  padding: 4px 10px;
  &:hover {
    color: var(--el-dropdown-menuItem-hover-color);
    background-color: var(--el-dropdown-menuItem-hover-fill);
  }
}
</style>