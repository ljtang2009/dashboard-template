<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="theme" :locale="language.locale"
    :date-locale="language.dateLocale" abstract>
    <n-loading-bar-provider>
      <n-message-provider>
        <app-config v-if="isDev" />
        <router-view />
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppConfig from '@/components/AppConfig/AppConfig.vue';
import useLanguageStore from '@/store/appConfig/language'
import { setI18nLanguage } from '@/i18n'
import { getThemeOverrides, getTheme } from '@/utils/themeConfigProvider';

const isDev = process.env['NODE_ENV'] === 'development'

const themeOverrides = computed(getThemeOverrides)

const theme = computed(getTheme)

const languageStore = useLanguageStore()

const language = computed(() => languageStore.language)

languageStore.$subscribe((_mutation, state) => {
  setI18nLanguage(state.languageId)
})
</script>
