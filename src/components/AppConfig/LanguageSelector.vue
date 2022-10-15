<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.language.title')}}</template>
    <template #content>
      <n-select v-model:value="currentLanguageId" :options="options" @update:value="update" />
    </template>
  </config-item>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import languages from '@/config/languages'
import useLanguageStore from '@/store/appConfig/language'
import appConfigDefault from '@/config/appConfigDefault.json'

export default defineComponent({
  name: 'LanguageSelector',
  components: {
    ConfigItem,
  },
  setup() {
    const languageStore = useLanguageStore()
    const currentLanguageId = ref<string>(languageStore.languageId)

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

    return {
      currentLanguageId,
      options: languages.map(item => { return { label: item.name, value: item.id } }),
      update,
      getConfig,
      reset
    }
  }
})
</script>
