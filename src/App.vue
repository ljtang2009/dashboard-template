<template>
  <!-- <a-config-provider :locale="locale">
    <router-view />
    <app-config />
  </a-config-provider> -->
  <n-config-provider :theme-overrides="themeOverrides" :locale="locale" :date-locale="dateLocale">
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
import { zhCN, dateZhCN } from 'naive-ui';
import { lighten } from '@/utils/color';
import useThemeStore from '@/store/theme'

export default defineComponent({
  components: {
    AppConfig
  },
  setup() {
    const isProd = process.env['NODE_ENV'] === 'production'
    const themeStore = useThemeStore()

    const themeOverrides = computed(() => {
      const primaryColor = themeStore.primaryColor
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

    const strong = true

    return {
      themeOverrides,
      strong,
      locale: zhCN,
      dateLocale: dateZhCN,
      isProd
    }
  },
})
</script>
