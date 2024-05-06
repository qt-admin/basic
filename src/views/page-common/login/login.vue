<template>
  <main class="wrap">
    <section class="card">
      <img class="bg-login" :src="LoginSvg" />
      <el-form class="form">
        <h5 class="login-title">欢迎登录</h5>
        <el-form-item>
          <el-input
            v-model="form.userName"
            class="login-input"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
            :maxlength="20"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            show-password
            class="login-input"
            placeholder="请输入密码"
            prefix-icon="Lock"
            clearable
            :maxlength="20"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="!form.userName || !form.password"
            :loading="loading"
            class="w-100%"
            type="primary"
            auto-insert-space
            @click="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import LoginSvg from '@/assets/svgs/bg_login.svg'
import { ElMessage } from 'element-plus'
import { ApiCommon } from '@/apis'
import { setToken, http } from '@/utils'

const router = useRouter()
const form = reactive({
  userName: 'admin',
  password: 'admin123'
})
const loading = ref(false)

function handleLogin() {
  const { userName, password } = toRefs(form)
  if (!userName) {
    ElMessage.warning('请输入用户名')
    return
  }
  if (!password) {
    ElMessage.warning('请输入密码')
    return
  }
  loading.value = true
  http.post<{ token: string }>(ApiCommon.login, {
    user_name: form.userName,
    password: form.password
  }).then((res) => {
    loading.value = false
    const { data, message, success } = res || {}
    if (!success) {
      ElMessage.error(message || '服务器错误')
      return
    }
    
    if (!data || !data.token) {
      ElMessage.error('登录失败，请稍后重试')
      return
    }
    setToken(data.token)
    router.push('/')
    
  }).catch((error) => {
    ElMessage.error(error || '服务器错误')
    loading.value = false
  })
}
</script>

<style scoped lang="scss">
.wrap {
  flex: 1;
  height: 100%;
  background: linear-gradient(to bottom, #fff, #fff 60% , var(--el-color-primary) 60%, var(--el-color-primary) 60%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 770px;
  min-width: 320px;
  height: 540px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.bg-login {
  width: 300px;
  height: auto;
}
.login-input {
  width: 240px;
}
.login-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

@media screen and (max-width: 850px) {
  .card {
    width: 90%;
  }
  .bg-login {
    width: 40%;
  }
}
@media screen and (max-width: 500px) {
  .card {
    flex-direction: column;
  }
  .login-title {
    text-align: center;
  }
}
</style>