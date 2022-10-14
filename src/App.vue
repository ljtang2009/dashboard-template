<template>
  <!-- <a-config-provider :locale="locale">
    <router-view />
    <app-config />
  </a-config-provider> -->
  <n-config-provider :theme-overrides="themeOverrides" :locale="language.locale" :date-locale="language.dateLocale">
    <n-message-provider>
      <app-config v-if="!isProd" />
      <div>
        <n-button type="primary">
          Primary
        </n-button>
      </div>
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import AppConfig from '@/components/AppConfig/AppConfig.vue';
// import { zhCN, dateZhCN } from 'naive-ui';
import { lighten } from '@/utils/color';
import usePrimaryColorStore from '@/store/appConfig/primaryColor'
import useLanguageStore from '@/store/appConfig/language'

export default defineComponent({
  components: {
    AppConfig
  },
  setup() {
    const isProd = process.env['NODE_ENV'] === 'production'

    const primaryColorStore = usePrimaryColorStore()

    const themeOverrides = computed(() => {
      const primaryColor = primaryColorStore.primaryColor
      const lightenColor = lighten(primaryColor, 6)
      return {
        common: {
          // 局调整 naive-ui 的字重配置。
          fontWeightStrong: '600',
          primaryColor: primaryColor,
          primaryColorHover: lightenColor,
          primaryColorPressed: lightenColor,
        }
      }
    })

    const languageStore = useLanguageStore()

    const language = computed(() => languageStore.language)

    return {
      isProd,
      themeOverrides,
      language
    }
  },
})
</script>
