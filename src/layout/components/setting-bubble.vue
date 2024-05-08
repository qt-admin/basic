<template>
  <div class="btn-float" @click="isDrawerShow = true">
    <el-icon>
      <Setting />
    </el-icon>
  </div>

  <el-drawer
    v-model="isDrawerShow"
    title="偏好设置"
    :size="300"
    class="relative"
  >
    <ul class="pl-20 pr-20">
      <li class="setting-item">
        <div class="setting-label">自定义主题色</div>
        <div class="setting-content">
          <el-color-picker
            v-model="global.theme"
            :predefine="['#1677ff', '#2f54eb', '#13c2c2', '#52c41a', '#f5222d', '#fa541c', '#fa8c16', '#a0d911']"
            @change="global.setThemeColor"
          />
        </div>
      </li>
      <li class="setting-item">
        <div class="setting-label">表单打开样式</div>
        <div class="setting-content">
          <el-switch
            v-model="global.formMode"
            active-text="抽屉"
            inactive-text="弹窗"
            active-value="drawer"
            inactive-value="dialog"
            inline-prompt
            width="55"
            style="--el-switch-on-color: var(--el-color-primary); --el-switch-off-color: var(--el-color-primary-light-3)"
            @change="global.setFormMode"
          />
        </div>
      </li>
      <li class="setting-item">
        <div class="setting-label">导航选项卡</div>
        <div class="setting-content">
          <el-switch
            v-model="global.isNavTabsShow"
            active-text="开启"
            inactive-text="关闭"
            :active-value="true"
            :inactive-value="false"
            inline-prompt
            width="55"
            style="--el-switch-on-color: var(--el-color-primary); --el-switch-off-color: var(--el-color-primary-light-3)"
            @change="global.setNavTabsStatus"
          />
        </div>
      </li>
    </ul>
    <div class="setting-footer">
      <el-button link @click="handleReset">重置</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useGlobalStore } from '@/stores';
import { ElMessageBox, ElMessage } from 'element-plus'

const global = useGlobalStore()
const isDrawerShow = ref(false)

// 重置配置
function handleReset() {
  ElMessageBox.confirm(
    '确认将当前配置重置?',
    'warning',
    {
      title: '提示',
      confirmButtonText: '确认',
      cancelButtonText: '再想想'
    }
  ).then(() => {
    global.resetSetting()
    ElMessage.success('重置成功')
  }).catch(() => {})
}

onBeforeMount(() => {
  global.setThemeColor(global.getThemeColor())
  global.setFormMode(global.getFormMode())
})
</script>

<style scoped>
.btn-float {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 10px;
  bottom: 20px;
  background: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  cursor: pointer;
  font-size: 18px;
  .el-icon {
    animation: rotate 5s linear infinite;
    transition: color .1s linear;
  }
  &:hover .el-icon {
    color: var(--el-color-primary);
    animation-play-state: paused;
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.setting-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.setting-content {
  margin-left: auto;
}
.setting-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--color-backgroud-soft);
  justify-content: center;
  border-top: 1px solid var(--el-border-color-light);
  background-color: var(--el-bg-color);
}
</style>