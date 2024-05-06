<template>
  <!-- 筛选区域 -->
  <filter-area @search="handleSearch" />
    
  <div v-loading="loading">
    <table-area
      :data="tableData"
      :pagination="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @add="isFormPopupShow = true"
      @edit="handleEdit"
    />
  </div>

  <!-- 新增抽屉 -->
  <form-popup
    v-model:visible="isFormPopupShow"
    :row="curRow"
    @refresh="handleSearch"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue'
import FilterArea from './components/filter-area.vue'
import TableArea from './components/table-area.vue'
import http, { type AnyObject } from '@/utils/http'
import { ElMessage } from 'element-plus'
import FormPopup from './components/form-popup.vue'
import { ApiUser } from '@/apis'
import type { UserItem } from '@/utils/mock/interface'

const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 100
})
const queryParams = reactive<AnyObject>({})
const tableData = ref<UserItem[]>([])
const loading = ref(false)
const isFormPopupShow = ref(false)
const curRow = ref<UserItem>({} as UserItem) // 当前选中的一行表格数据

function handleSizeChange(val: number) {
  pagination.pageSize = val
  getList()
}
function handleCurrentChange(val: number) {
  pagination.pageNum = val
  getList()
}

function getList() {
  loading.value = true
  http.post<UserItem[]>(ApiUser.getUserList, {
    pageNum: pagination.pageNum,
    pageSize: pagination.pageSize,
    ...queryParams
  }).then((res) => {
    loading.value = false
    const { data, message, success } = res || {}
    if (!success) {
      ElMessage.error(message || '服务器错误')
      return
    }
    tableData.value = data || []
  }).catch((error) => {
    ElMessage.error(error || '服务器错误')
    loading.value = false
  })
}

function handleSearch(val: AnyObject) {
  Object.assign(queryParams, val || {})
  pagination.pageNum = 1
  getList()
}

// 编辑表单
function handleEdit(row: UserItem) {
  curRow.value = row
  isFormPopupShow.value = true
}

onBeforeMount(() => {
  getList()
})
</script>
