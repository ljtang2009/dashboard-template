<template>
  <n-space justify="center" vertical>
    <n-form ref="formRef" :model="formValue" :rules="rules" :show-label="false">
      <n-form-item path="loginName">
        <n-input v-model:value="formValue.loginName" placeholder="账户" />
      </n-form-item>
      <n-form-item path="loginPassword">
        <n-input v-model:value="formValue.loginPassword" placeholder="密码" type="password" />
      </n-form-item>
    </n-form>
    <div>
      <n-space justify="space-between" align="center">
        <n-checkbox>
          自动登录
        </n-checkbox>
        <n-text type="primary" style="cursor: pointer;">注册账户</n-text>
      </n-space>
    </div>
    <n-button type="primary" block :loading="loading" @click="submit">
      确定
    </n-button>
  </n-space>
</template>
<script lang="ts">
export default {
  name: 'Login'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { FormInst } from 'naive-ui'

const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const formValue = ref({
  loginName: '',
  loginPassword: ''
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
  }
}

function submit() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      loading.value = true
    }
    // if (!errors) {
    //   // message.success('Valid')
    // } else {
    //   console.log(errors)
    //   message.error('Invalid')
    // }
  })
}
</script>
