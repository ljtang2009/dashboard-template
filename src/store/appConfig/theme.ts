import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import Theme from '@/config/theme';
import { useOsTheme } from 'naive-ui';

export default defineStore('theme', () => {
  const themeId = ref<string>('');
  const isDark = computed(() => {
    let result = themeId.value === Theme.dark;
    if (themeId.value === Theme.os) {
      const osThemeRef = useOsTheme();
      result = osThemeRef.value === Theme.dark;
    }
    return result;
  });

  /**
   * 初始化
   * @param appConfig
   */
  const init = (appConfig: { themeId: string }) => {
    themeId.value = appConfig.themeId
  }

  return {
    /**
     * 主题号
     */
    themeId,
    /**
     * 是否是暗主题
     */
    isDark,
    init,
  };
});
