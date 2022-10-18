import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAppConfig } from '@/config/appConfig';

export default defineStore('theme', () => {
  const appConfig = getAppConfig();
  const themeId = ref<string>(appConfig['themeId']);

  return {
    /**
     * 主题号
     */
    themeId,
  };
});
