<template>
  <span class="header-info-item" :disabled="isTooltipDisabled">
    <el-icon ref="popoverRef" size="16px" class="icon-badge" :class="{ 'dot' : !!list.length }">
      <Bell />
    </el-icon>
  </span>
  <el-popover
    :virtual-ref="popoverRef"
    trigger="click"
    virtual-triggering
    width="300px"
    @show="isTooltipDisabled = true"
    @hide="isTooltipDisabled = false"
  >
    <div class="notice-title">
      <span>通知</span>
      <el-button link type="primary" @click="handleNoticeClear">全部已读</el-button>
    </div>
    <el-divider class="important-mt-10 important-mb-10" />
    <div class="notice-content">
      <ul v-if="list.length">
        <li v-for="item in list" :key="item.notice_id" class="notice-item">{{ item.content }}</li>
      </ul>
      <el-empty v-else :image-size="50" description="暂无未读消息" />
    </div>
    <el-divider class="important-mt-10 important-mb-10" />
    <div class="notice-footer">
      <el-button link type="primary" @click="ElMessage.warning('功能待开发')">前往通知中心</el-button>
    </div>
  </el-popover>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { ApiCommon } from '@/apis'
import { http } from '@/utils'
import { ElMessage } from 'element-plus'

type NoticeItem = {
  notice_id: number,
  content: string,
  createTime: string
}

const popoverRef = ref()
const isTooltipDisabled = ref(false)
const list = ref<NoticeItem[]>([])

// 获取通知列表
function loadList() {
  http.get<NoticeItem[]>(ApiCommon.getNoticeList).then((res) => {
    const { data, message, success } = res || {}
    if (!success) {
      ElMessage.error(message || '服务器错误')
      return
    }
    list.value = (data || []).slice(0, 3)
  }).catch((error) => {
    ElMessage.error(error || '服务器错误')
  })
}

// 清空通知
function handleNoticeClear() {
  if (!list.value.length) return

  // 此处调用清空通知接口...
  list.value = []
}

onBeforeMount(() => {
  loadList()
})

</script>
<style scoped lang="scss">
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
    .icon-badge {
      transform-origin: center top;
      animation: shaking 1s alternate forwards;
    }
  }
}
.icon-badge {
  position: relative;
  &.dot {
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: var(--el-color-danger);
      border-radius: 50%;
      right: -3px;
      top: -3px;
    }
  }
}
@keyframes shaking {
  10% { transform: translate(.125rem, -0.125rem) rotate(0deg) scale(1); }
	15% { transform: translate(-0.125rem, -0.125rem) rotate(-40deg) scale(1); }
	25% { transform: translate(.0625rem, -0.0625rem) rotate(30deg) scale(1.1); }
	40% { transform: translate(.125rem, -0.125rem) rotate(-20deg) scale(1.2); }
	55% { transform: translate(-0.125rem, -0.125rem) rotate(15deg) scale(1.3); }
	70% { transform: translate(.0625rem, -0.0625rem) rotate(-10deg) scale(1.2); }
	85% { transform: translate(0rem, 0rem) rotate(5deg) scale(1); }
	100% { transform: translate(0rem, 0rem) rotate(0deg) scale(1); }
}
.notice-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notice-content {
  min-height: 190px;
}
.notice-item {
  font-size: 13px;
  padding: 4px;
  cursor: pointer;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  border-radius: 4px;
  &:hover {
    background-color: var(--color-backgroud-soft);
  }
}
.notice-footer {
  text-align: center;
}
</style>