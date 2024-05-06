<template>
  <el-form
    ref="filterRef"
    :model="form"
    :inline="true"
    label-width="80px"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input
        v-model="form.userName"
        class="important-w-180"
        placeholder="请输入"
        clearable
      />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input
        v-model.number="form.phone"
        class="important-w-180"
        placeholder="请输入"
        clearable
      />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select
        v-model="form.gender"
        class="important-w-180"
        placeholder="请选择"
        clearable
      >
        <el-option label="未知" value="0" />
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="创建日期" prop="createDate">
      <el-date-picker
        v-model="form.createDate"
        class="important-w-180"
        type="date"
        placeholder="请选择"
        clearable
      />
    </el-form-item>
    <el-form-item class="form-item-operation">
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

const emits = defineEmits(['search'])
const form = reactive({
  userName: '',
  phone: '',
  gender: '',
  createDate: ''
})
const filterRef = ref<FormInstance>()

function handleReset() {
  filterRef.value?.resetFields()
}
function handleSearch() {
  emits('search', form)
}
</script>
<style scoped lang="scss">
.form-item-operation {
  float: right;
  :deep(.el-form-item__content) {
    flex-wrap: nowrap;
  }
}
</style>