<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRules"
    label-width="60px"
    label-position="left"
    class="p-20"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入" :maxlength="20" clearable />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择" clearable>
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <editor-pro
        v-model:value="form.content"
      />
    </el-form-item>
    <el-form-item label-width="0">
      <div class="m-auto">
        <el-button>关闭</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import EditorPro from '@/components/editor-pro.vue'
import { ref, reactive } from 'vue'
import { type FormRules } from 'element-plus';

const form = reactive({
  title: '',
  type: '',
  content: ''
})
const typeList = ref([
  { id: '1', name: '政治' },
  { id: '2', name: '经济' },
  { id: '3', name: '社会' },
  { id: '4', name: '娱乐' },
  { id: '5', name: '体育' }
])
interface IForm {
  title: string;
  type: string;
  content: string;
}
const formRules = reactive<FormRules<IForm>>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择类型', trigger: 'change' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
})
const formRef = ref()

// 表单提交
function handleConfirm() {
  formRef.value?.validate((res: boolean) => {
    if (!res) return

    console.log(form)
    // ...此处填写表单提交逻辑
  })
}
</script>