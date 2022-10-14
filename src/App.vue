<template>
  <!-- <a-config-provider :locale="locale">
    <router-view />
    <app-config />
  </a-config-provider> -->
  <n-config-provider :theme-overrides="themeOverrides" :locale="language.locale" :date-locale="language.dateLocale">
    <n-loading-bar-provider>
      <n-message-provider>
        <app-config v-if="!isProd" />
        <div>
          <n-button type="primary">
            primary
          </n-button>
        </div>
      </n-message-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import AppConfig from '@/components/AppConfig/AppConfig.vue';
import useLanguageStore from '@/store/appConfig/language'
import { setI18nLanguage } from '@/i18n'
import { getThemeOverrides } from '@/utils/themeConfigProvider';

export default defineComponent({
  components: {
    AppConfig
  },
  setup() {
    const isProd = process.env['NODE_ENV'] === 'production'

    const themeOverrides = computed(getThemeOverrides)

    const languageStore = useLanguageStore()

    const language = computed(() => languageStore.language)

    languageStore.$subscribe((_mutation, state) => {
      setI18nLanguage(state.languageId)
    })

    return {
      isProd,
      themeOverrides,
      language
    }
  },
})
</script>
