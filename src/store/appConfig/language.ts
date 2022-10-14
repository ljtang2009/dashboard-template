import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import appConfig from '@/config/app.json';
import languages from '@/config/languages';

export default defineStore('language', () => {
  const languageId = ref<string>(appConfig.languageId);
  const language = computed(() => {
    let result = languages[0];
    for (const item of languages) {
      if (item.id === languageId.value) {
        result = item;
        break;
      }
    }
    return result;
  });

  return {
    /**
     * 语言号
     */
    languageId,
    /**
     * 语言对象
     */
    language,
  };
});
