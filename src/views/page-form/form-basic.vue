<template>
  <main class="wrap">
    <el-form
      ref="formRef"
      :model="form"
      :rules="formRules"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入" :maxlength="20" clearable />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="form.department" placeholder="请选择" clearable>
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入" :maxlength="11" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入" :maxlength="30" clearable />
      </el-form-item>
      <el-form-item label="创建日期" prop="createDate">
        <el-date-picker
          v-model="form.createDate"
          type="date"
          placeholder="请选择"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          inline-prompt
          active-text="启用"
          inactive-text="停用"
        />
      </el-form-item>
      <el-form-item label="来源" prop="source">
        <el-radio-group v-model="form.source">
          <el-radio value="PC">PC</el-radio>
          <el-radio value="APP">APP</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="请输入"
          :maxlength="200"
          clearable
          show-word-limit
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          class="upload"
          action=""
          :http-request="handleSaveFile"
          :on-remove="handleRemove"
          multiple
          :limit="5"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :file-list="form.fileList"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip ml-20 important-mt-0">
            附件最多不超过 5 个，最大不超过 10M。
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item class="pt-40">
        <el-button @click="handleClose">关闭</el-button>
        <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts" setup>
import { ElMessage, type FormRules, type UploadRequestOptions, type UploadRawFile, type UploadUserFile, type UploadFile, type UploadFiles } from 'element-plus';
import { ref, reactive } from 'vue';
import { http, regexp } from '@/utils';

interface IForm {
  userName: string;
  department: string;
  phone: string;
  email: string;
  createDate: string;
  status: number;
  source: string;
  remark: string;
  fileList: UploadFile[];
}
const form = reactive<IForm>({
  userName: '', // 用户名
  department: '', // 部门
  phone: '', // 手机号
  email: '', // 邮箱
  createDate: '', // 创建日期
  status: 0, // 启停用状态 1启用 0停用
  source: 'PC', // 来源 PC | APP
  remark: '', // 备注
  fileList: []
})

const departmentList = ref([
  { id: '001', name: '测试部门' },
  { id: '002', name: '研发部门' },
  { id: '003', name: '设计部门' },
  { id: '004', name: '职能部门' },
  { id: '005', name: '后勤部门' }
])
const formRules = reactive<FormRules<IForm>>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
})

// 校验手机号的规则
function validatePhone(
  rule: unknown,
  value: string,
  callback: (error?: string | Error) => void
) {
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  if (!regexp.PHONE.test(value)) {
    return callback(new Error('手机号格式不正确'))
  }
  callback()
}

// 校验邮箱的规则
function validateEmail(
  rule: unknown,
  value: string,
  callback: (error?: string | Error) => void
) {
  if (!value) {
    return callback(new Error('请输入邮箱'))
  }
  if (!regexp.EMAIL.test(value)) {
    return callback(new Error('邮箱格式不正确'))
  }
  callback()
}

// 上传文件到服务器
function handleSaveFile(options: UploadRequestOptions) {
  // const file = options.file
  // // ... 此处调用上传接口上传
  // http.post(uploadApi, {
  //   file
  // }).then(res => {
  //   // ... 处理成功请求
  //   options.onSuccess(null)
  // }).catch(() => {
  //   // ... 处理失败请求
  //   options.onError(null)
  //   ElMessage.error('文件上传失败')
  // })
}
// 上传文件之前限制文件大小
function beforeUpload(file: UploadRawFile) {
  const isOversize = file.size / 1024 / 1024 < 10
  if (!isOversize) {
    ElMessage.error('上传文件不能超过 10MB!')
  }
  return isOversize
}
// 文件超出限制时操作
function handleExceed(files: File[], uploadFiles: UploadUserFile[]) {
  ElMessage.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + uploadFiles.length} 个文件`)
}
// 文件移除操作
function handleRemove(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  form.fileList = uploadFiles
}

const formRef = ref()
const loading = ref(false)
// 关闭侧边栏
function handleClose() {
  ElMessage.warning('返回上一页或者关闭当前页面')
  formRef.value?.resetFields()
}
// 表单提交
function handleConfirm() {
  formRef.value?.validate((res: boolean) => {
    if (!res) return
    console.log(form)
  })
}
</script>

<style scoped lang="scss">
.wrap {
  padding-top: 20px;
  height: 100%;
  position: relative;
}
</style>