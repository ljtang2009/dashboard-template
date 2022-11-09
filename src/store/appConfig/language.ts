import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import languages from '@/config/languages';

export default defineStore('language', () => {
  const languageId = ref<string>('');
  const canCustomLanguage = ref<string>('Y');
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
    /**
     * 是否可以自定义语言
     */
    canCustomLanguage
  };
});
