<template>
  <h5>基本信息</h5>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRules"
    label-width="100px"
    class="pt-20"
  >
    <el-form-item label="用户昵称" prop="userName">
      <el-upload
        class="avatar"
        action="/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <el-icon v-else class="avatar-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="用户昵称" prop="userName">
      <el-input
        v-model="form.userName"
        :maxlength="20"
        show-word-limit
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item label="出生日期" prop="birthDate">
      <el-date-picker
        v-model="form.birthDate"
        type="date"
        placeholder="请选择"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item label="个人介绍" prop="introduce">
      <el-input
        v-model="form.introduce"
        type="textarea"
        :maxlength="100"
        show-word-limit
        placeholder="请输入"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleConfirm">保存修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { type FormRules, type UploadProps } from 'element-plus';
import { getUserInfo } from '@/utils'

interface IForm {
  avatar: string;
  userName: string;
  birthDate: string;
  introduce: string;
}
const form = reactive<IForm>({
  avatar: '',
  userName: '',
  birthDate: '',
  introduce: ''
})
const formRules = reactive<FormRules<IForm>>({
  userName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  birthDate: [{ required: true, message: '请选择出生日期', trigger: 'change' }]
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

// 上传头像
const handleAvatarSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
  console.log(uploadFile)
  form.avatar = URL.createObjectURL(uploadFile.raw!)
}

onBeforeMount(() => {
  const userInfo = getUserInfo() as { avatar: '', name: '' }
  form.avatar = userInfo.avatar || ''
  form.userName = userInfo.name || ''
})
</script>

<style scoped lang="scss">
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px dashed var(--el-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.avatar-icon {
  font-size: 28px;
  color: var(--el-text-color-placeholder);
}
</style>