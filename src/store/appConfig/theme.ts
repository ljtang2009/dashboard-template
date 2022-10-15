import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getAppConfig } from '@/config/appConfig';

export default defineStore('theme', () => {
  const appConfig = getAppConfig();
  const themeId = ref<string>(appConfig['themeId']);
  // const language = computed(() => {
  //   let result = languages[0];
  //   for (const item of languages) {
  //     if (item.id === languageId.value) {
  //       result = item;
  //       break;
  //     }
  //   }
  //   return result;
  // });

  return {
    /**
     * 主题号
     */
    themeId,
  };
});
