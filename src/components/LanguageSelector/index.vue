<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-icon :component="LanguageFilled" size="24"></n-icon>
  </n-dropdown>
</template>
<script lang="ts">
export default {
  name: 'LanguageSelector'
}
</script>
<script setup lang="ts">
import {
  h,
} from 'vue'
import {
  LanguageFilled,
  CheckFilled
} from '@vicons/material'
import languages from '@/config/languages'
import useLanguageStore from '@/store/appConfig/language'
import { NIcon } from 'naive-ui'

function renderCheckIcon(languageId: string) {
  return () => {
    if (languageId === languageStore.languageId) {
      return h(NIcon, null, {
        default: () => h(CheckFilled)
      })
    }
    else {
      return h(NIcon)
    }
  }
}

const languageStore = useLanguageStore()
const options = languages.map(item => {
  return {
    label: item.name,
    key: item.id,
    icon: renderCheckIcon(item.id)
  }
})

function handleSelect(key: string) {
  languageStore.$patch((state) => {
    state.languageId = key
  })
  // TODO 保存配置信息
}

</script>
