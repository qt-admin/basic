<template>
  <h5>账号设置</h5>
  <ul>
    <li class="item">
      <span class="item-name">手机</span>
      <span class="item-value" :class="{ 'empty': !form.phone }">
        {{ form.phone || '未绑定' }}
      </span>
      <el-button
        link
        type="primary"
        class="ml-auto"
        @click="ElMessage.warning('待开发')"
      >{{ form.phone ? '换绑':'绑定' }}</el-button>
    </li>
    <li class="item">
      <span class="item-name">微信</span>
      <span class="item-value" :class="{ 'empty': !form.wechat }">
        {{ form.wechat || '未绑定' }}
      </span>
      <el-button
        link
        type="primary"
        class="ml-auto"
        @click="ElMessage.warning('待开发')"
      >{{ form.wechat ? '换绑':'绑定' }}</el-button>
    </li>
    <li class="item">
      <span class="item-name">密码</span>
      <el-button
        link
        type="primary"
        class="ml-auto"
        @click="ElMessage.warning('待开发')"
      >重置</el-button>
    </li>
    <li class="item">
      <span class="item-name">账号注销</span>
      <el-button
        link
        type="primary"
        class="ml-auto"
        @click="handleLogout"
      >注销</el-button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { removeToken } from '@/utils'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  phone: '',
  password: '',
  wechat: ''
})

// 注销账户
function handleLogout() {
  ElMessageBox.confirm(
    '账号注销后不可恢复，确认注销？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      // ...此处调用注销接口

      ElMessage.success('注销成功')
      removeToken()
      router.push('/login')
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
  font-size: 14px;
  &-name {
    display: inline-block;
    width: 100px;
  }
  &-value {
    &.empty {
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>