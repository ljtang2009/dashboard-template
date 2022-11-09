<template>
  <n-space justify="center" vertical>
    <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false">
      <n-form-item path="loginName">
        <n-input v-model:value="formValue.loginName" placeholder="账户" />
      </n-form-item>
      <n-form-item path="loginPassword">
        <n-input v-model:value="formValue.loginPassword" placeholder="密码" type="password" />
      </n-form-item>
      <n-form-item path="loginPasswordConfirm">
        <n-input v-model:value="formValue.loginPasswordConfirm" placeholder="确认密码" type="password" />
      </n-form-item>
    </n-form>
    <n-space justify="space-between" align="center">
      <div style="width: 100px;">
        <n-button type="primary" block @click="router.push('login')">
          注册
        </n-button>
      </div>
      <n-button text type="primary" @click="router.push('login')">
        使用已有账户登录
      </n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts">
export default {
  name: 'Register'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { FormInst } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref<FormInst | null>(null)

const formValue = ref({
  loginName: '',
  loginPassword: '',
  loginPasswordConfirm: ''
})

const rules = {
  loginName: {
    required: true,
    message: '请输入账户',
    trigger: ['input', 'blur']
  },
  loginPassword: {
    required: true,
    message: '请输入密码',
    trigger: ['input', 'blur']
  },
  loginPasswordConfirm: {
    validator: validatePasswordSame,
    message: '两次密码输入不一致',
    trigger: ['input', 'blur']
  }
}

function validatePasswordSame() {
  return formValue.value.loginPassword === formValue.value.loginPasswordConfirm
}
</script>
