<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.language.title')}}</template>
    <template #content>
      <n-select v-model:value="currentLanguageId" :options="options" @update:value="update" />
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'LanguageSelector'
}
</script>
<script setup lang="ts">
import { ref } from 'vue';
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import languages from '@/config/languages'
import useLanguageStore from '@/store/appConfig/language'
import appConfigDefault from '@/config/appConfigDefault.json'

const languageStore = useLanguageStore()
const currentLanguageId = ref<string>(languageStore.languageId)
const options = languages.map(item => { return { label: item.name, value: item.id } })

const update = async (value: string) => {
  languageStore.$patch((state) => {
    state.languageId = value
  })
}

const getConfig = () => {
  return {
    languageId: languageStore.languageId,
  }
}

const reset = () => {
  currentLanguageId.value = appConfigDefault.languageId
  update(currentLanguageId.value)
}

defineExpose({
  getConfig,
  reset
})
</script>
