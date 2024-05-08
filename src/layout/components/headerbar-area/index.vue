<template>
  <header class="layout-headerbar">
    <div class="logo">
      <img src="@/assets/logo.png" />
      <span>{{ projectName }}</span>
    </div>

    <div class="layout-header-info">
      <!-- 消息通知弹出框 -->
      <notice-popover />
      <span class="header-info-item" @click="handleSwitchScreenfull">
        <el-icon size="16px">
          <component :is="screenfullIcon" />
        </el-icon>
      </span>
      <span class="header-info-item" @click="handleChangeMode">
        <el-icon size="20px">
          <component :is="modeIcon" />
        </el-icon>
      </span>

      <el-dropdown class="ml-10">
        <div class="header-info-user">
          <el-image v-if="userInfo.avatar" class="header-info-avatar" :src="userInfo.avatar" fit="cover"></el-image>
          <span>{{ userInfo.name }}</span>
          <el-icon size="10px"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu size="small">
            <el-dropdown-item @click="router.push('/personal-center')">个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { toggleTheme, removeToken, getUserInfo } from '@/utils'
import screenfull from 'screenfull'
import { useRouter } from 'vue-router'
import NoticePopover from './notice-popover.vue'
import { ElMessage } from 'element-plus'

const projectName = import.meta.env.VITE_PROJECT_NAME
const router = useRouter()
const mode = ref('light')
const modeIcon = computed(() => {
  return mode.value === 'light' ? 'Sunny' : 'Moon'
})
const isScreenfull = ref(false) // 判断是否全屏
const screenfullIcon = computed(() => {
  return isScreenfull.value ? 'Aim' : 'FullScreen'
})
const userInfo = reactive({
  name: '',
  avatar: ''
})

// 切换暗黑/明亮模式
function handleChangeMode(e: MouseEvent) {
  toggleTheme(e).then(() => {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  })
}

// 切换全屏/非全屏
function handleSwitchScreenfull() {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  } else {
    ElMessage('当前浏览器版本不支持切换全屏')
  }
}
// 监听全屏/非全屏状态
function handleMonitorFullscreenStatus() {
  isScreenfull.value = screenfull.isFullscreen
}

// 退出登录
function handleLogout() {
  removeToken()
  router.push('/login')
}

onMounted(() => {
  screenfull.on('change', handleMonitorFullscreenStatus)

  Object.assign(userInfo, getUserInfo())
  console.log(getUserInfo())
})
onUnmounted(() => {
  screenfull.off('change', handleMonitorFullscreenStatus)
})
</script>

<style scoped lang="scss">
.layout-headerbar {
  height: var(--el-header-height);
  box-shadow: var(--el-box-shadow-lighter);
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  background-image: radial-gradient(transparent 1px,var(--el-bg-color-overlay) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}
.logo {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  background-color: var(--el-bg-color-overlay);
  height: 100%;
  padding: 0 10px;
  color: var(--el-color-primary);
  > img {
    height: 26px;
    width: auto;
    margin-right: 6px;
    flex-shrink: 0;
  }
  > span {
    white-space: nowrap;
  }
}
.layout-header-info {
  height: 100%;
  background-color: var(--el-color-primary);
  color: #fff;
  border-bottom-left-radius: 48px;
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 10px 0 30px;
  column-gap: 4px;
  .header-info-item {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    display: inline-block;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .1s linear;
    &:hover {
      background-color: var(--el-color-primary-light-3);
    }
  }
  .header-info-user {
    display: flex;
    align-items: center;
    column-gap: 6px;
    font-size: 12px;
    color: #fff;
    outline: none;
  }
  .header-info-avatar {
    width: 25px;
    height: 25px;
    border-radius: 4px
  }
}
</style>