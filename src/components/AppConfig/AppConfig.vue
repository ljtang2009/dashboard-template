<template>
  <div>
    <drag-handle @tap="visible = !visible" />
    <n-drawer v-model:show="visible" display-directive="show">
      <n-drawer-content>
        <template #header>{{$t('appConfig.systemConfig')}}</template>
        <template #footer>
          <n-space size="small">
            <n-button size="small" type="primary" :loading="isSaving" @click="save">{{$t('appConfig.save')}}</n-button>
            <n-button size="small" type="warning" :loading="isDoingReset" @click="reset">{{$t('appConfig.reset')}}
            </n-button>
            <n-button size="small" @click="visible = false">{{$t('appConfig.close')}}</n-button>
          </n-space>
        </template>
        <primary-color-selector :ref="registerComponent" />
        <n-divider />
        <language-selector :ref="registerComponent" />
        <n-divider />
        <theme-selector :ref="registerComponent" />
        <n-divider />
        <product :ref="registerComponent" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppConfig',
}
</script>
<script setup lang="ts">
import { ref, ComponentPublicInstance } from 'vue';
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { save as saveAppConfig } from '@/api/admin/app-config'
import DragHandle from '@/components/AppConfig/DragHandle.vue'

// 配置组件
import PrimaryColorSelector from '@/components/AppConfig/PrimaryColorSelector.vue'
import LanguageSelector from '@/components/AppConfig/LanguageSelector.vue'
import ThemeSelector from '@/components/AppConfig/ThemeSelector.vue'
import Product from '@/components/AppConfig/Product.vue'

const message = useMessage()
const { t } = useI18n()

const visible = ref(false)
const isSaving = ref(false)
// const components = ref([])
const components = ref<Array<ComponentPublicInstance | Element | null>>([])

// 注册组件, 用来批量执行
function registerComponent(ref: ComponentPublicInstance | Element | null) {
  if (components.value.indexOf(ref) === -1) {
    components.value.push(ref)
  }
}

// 保存配置
async function save() {
  isSaving.value = true
  let appConfigData = {}
  for (const component of components.value) {
    const getConfigFunctionName = 'getConfig'
    if (component && getConfigFunctionName in component) {
      const getConfigFunction = component[getConfigFunctionName] as Function
      if (getConfigFunction) {
        appConfigData = { ...appConfigData, ...(getConfigFunction()) }
      }
    }
  }
  try {
    await saveAppConfig(appConfigData)
  }
  catch (e) {
    return
  }
  finally {
    isSaving.value = false
  }
  message.success(t('appConfig.callback.saveSuccessfully'))
}

const isDoingReset = ref(false)

// 重置
function reset() {
  isDoingReset.value = true
  const resetFunctionList = []
  for (const component of components.value) {
    const getConfigFunctionName = 'reset'
    if (component && getConfigFunctionName in component) {
      const resetFunction = component[getConfigFunctionName] as Function
      if (resetFunction) {
        resetFunctionList.push(resetFunction())
      }
    }
  }
  // 不处理错误，由子组件处理
  Promise.all(resetFunctionList).then(() => {
    message.success(t('appConfig.callback.resetSuccessfully'))
  })
    .finally(() => {
      isDoingReset.value = false
    })
}
</script>
