import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getAppConfig } from '@/config/appConfig';
import ThemeType from '@/config/theme';
import { useOsTheme } from 'naive-ui';

export default defineStore('theme', () => {
  const appConfig = getAppConfig();
  const themeId = ref<string>(appConfig['themeId']);

  const isDark = computed(() => {
    let result = themeId.value === ThemeType.dark;
    if (themeId.value === ThemeType.os) {
      const osThemeRef = useOsTheme();
      result = osThemeRef.value === ThemeType.dark;
    }
    return result;
  });

  return {
    /**
     * 主题号
     */
    themeId,
    /**
     * 是否事暗主题
     */
    isDark,
  };
});
