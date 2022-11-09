<template>
  <config-item>
    <template #title>{{ $t('appConfig.modules.language.title') }}</template>
    <template #right-title>
      <n-checkbox :checked="languageStore.canCustomLanguage === 'Y'" @update:checked="handleCanCustomLanguageChange">
        {{ $t('appConfig.customizable') }}
      </n-checkbox>
    </template>
    <template #content>
      <n-select v-model:value="languageStore.languageId" size="small" :options="options" @update:value="update" />
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'LanguageSelector'
}
</script>
<script setup lang="ts">
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import languages from '@/config/languages'
import useLanguageStore from '@/store/appConfig/language'
import appConfigDefault from '@/config/appConfigDefault'

const languageStore = useLanguageStore()
const options = languages.map(item => { return { label: item.name, value: item.id } })

const update = async (value: string) => {
  languageStore.$patch((state) => {
    state.languageId = value
  })
}

const handleCanCustomLanguageChange = (checked: boolean) => {
  languageStore.$patch((state) => {
    state.canCustomLanguage = checked ? 'Y' : 'N'
  })
}

const getConfig = () => {
  return {
    languageId: languageStore.languageId,
    canCustomLanguage: languageStore.canCustomLanguage
  }
}

const reset = () => {
  update(appConfigDefault.languageId)
  handleCanCustomLanguageChange(appConfigDefault.canCustomLanguage === 'Y')
}

defineExpose({
  getConfig,
  reset
})
</script>
