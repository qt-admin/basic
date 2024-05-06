<template>
  <div class="pb-10">
    <el-button type="primary" @click="emits('add')">新增</el-button>
  </div>
  <el-table :data="data" max-height="350px">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="user_id" label="用户id" width="100" />
    <el-table-column prop="user_name" label="用户名" width="100" />
    <el-table-column prop="nickname" label="用户昵称" width="100" />
    <el-table-column prop="department" label="所属部门" width="100" />
    <el-table-column prop="phone" label="手机号" width="150" />
    <el-table-column prop="email" label="邮箱" min-width="150" />
    <el-table-column label="状态" width="100">
      <template #default="{ row }">
        <el-tag
          :type="row.status === 1 ? 'success' : 'danger'"
        >
          {{ row.status === 1 ? '启用' : '停用' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <el-button link type="primary" size="small" @click="ElMessage.warning('待开发')">详情</el-button>
        <el-button link type="primary" size="small" @click="emits('edit', row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pt-20 flex flex-justify-center">
    <el-pagination
      v-model:current-page="pagination.pageNum"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      small
      :disabled="false"
      :background="true"
      :layout="layout"
      :total="pagination.total"
      @size-change="(e: number) => emits('size-change', e)"
      @current-change="(e: number) => emits('current-change', e)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import http, { type AnyObject } from '@/utils/http'
import { useGlobalStore } from '@/stores'
import { ElMessage } from 'element-plus';
const global = useGlobalStore()

const emits = defineEmits(['size-change', 'current-change', 'add', 'edit'])
type Props = {
  data: AnyObject[],
  pagination: {
    pageNum: number,
    pageSize: number,
    total: number,
  }
}
withDefaults(defineProps<Props>(), {
  data: () => [],
  pagination: () => {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 100
    }
  }
})
const layout = ref('total, sizes, prev, pager, next, jumper')
// 监听侧边栏是否隐藏
watch(
  () => global.isSidebarHide,
  (newVal) => {
    if (newVal) {
      layout.value = 'total, pager'
    } else {
      layout.value = 'total, sizes, prev, pager, next, jumper'
    }
  }
)
</script>
