<template>
  <component
    :is="global.formMode === 'dialog' ? 'el-dialog' : 'el-drawer'"
    v-model="isVisible"
    :title="isEdit ? '编辑' : '新增'"
    :size="620"
    :width="620"
    class="relative"
    @closed="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="formRules"
      class="pl-40 pb-60"
      label-width="150px"
      label-position="left"
      v-loading="loading"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入" :maxlength="20" clearable />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入" :maxlength="20" clearable />
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
    </el-form>
    <footer class="form-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="handleConfirm">确定</el-button>
    </footer>
  </component>
</template>

<script lang="ts" setup>
import { ElMessage, type FormRules } from 'element-plus';
import { ref, reactive, computed, watch } from 'vue';
import { regexp, http } from '@/utils';
import type { AnyObject } from '@/utils/http';
import { ApiUser } from '@/apis';
import { useGlobalStore } from '@/stores';
import type { UserItem } from '@/utils/mock/interface'

const global = useGlobalStore()
interface IForm {
  userName: string;
  nickName: string;
  department: string;
  phone: string;
  email: string;
  status: number;
}
const form = reactive<IForm>({
  userName: '', // 用户名
  nickName: '', // 昵称
  department: '', // 部门
  phone: '', // 手机号
  email: '', // 邮箱
  status: 0 // 启停用状态 1启用 0停用
})
type Props = {
  visible: boolean,
  row: UserItem
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  row: () => {
    return {} as UserItem
  }
})
const emits = defineEmits(['update:visible', 'refresh'])
const isVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
const isEdit = computed(() => {
  return !!props.row.user_id
})
watch(
  () => props.visible,
  (newVal) => {
    const row = props.row
    if (newVal && props.row && Object.keys(props.row).length) {
      form.userName = row.user_name
      form.nickName = row.nickname
      form.department = row.department
      form.phone = row.phone
      form.email = row.email
      form.status = row.status
    }
  }
)
const departmentList = ref([
  { id: '001', name: '测试部门' },
  { id: '002', name: '研发部门' },
  { id: '003', name: '设计部门' },
  { id: '004', name: '职能部门' },
  { id: '005', name: '后勤部门' }
])
const formRules = reactive<FormRules<IForm>>({
  userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  department: [{ required: true, message: '请选择部门', trigger: 'change' }],
  phone: [{ required: true, validator: validatePhone, trigger: 'blur' }],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
  status: [{ required: true, message: '请选择停启用状态', trigger: 'change' }]
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

const formRef = ref()
const loading = ref(false)
// 关闭侧边栏
function handleClose() {
  isVisible.value = false
  formRef.value?.resetFields()
}
// 表单提交
function handleConfirm() {
  formRef.value?.validate((res: boolean) => {
    if (!res) return
    const params: Partial<UserItem> = {
      user_name: form.userName, 
      nickname: form.nickName,
      department: form.department,
      phone: form.phone,
      email: form.email,
      status: form.status
    }

    if (isEdit.value) {
      params.user_id = props.row.user_id
    }

    loading.value = true
    // 此处新增的请求只是模拟过程，数据不会真实增加~~
    http.post<AnyObject[]>(
      isEdit.value ? ApiUser.userEdit : ApiUser.userAdd,
      params
    ).then((res) => {
      loading.value = false
      const { message, success } = res || {}
      if (!success) {
        ElMessage.error(message || '服务器错误')
        return
      }
      ElMessage.success(`${isEdit.value ? '编辑' : '新增'}成功`)
      emits('refresh')
      handleClose()
    }).catch((error) => {
      ElMessage.error(error || '服务器错误')
      loading.value = false
    })
  })
}
</script>

<style scoped lang="scss">
.form-footer {
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