import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import languages from '@/config/languages';
import { saveStorage as saveStorageAppConfig } from '@/bootstrap/appConfig'

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

  /**
   * 初始化
   * @param appConfig
   */
  const init = (appConfig: { languageId: string, canCustomLanguage: string }) => {
    languageId.value = appConfig.languageId
    canCustomLanguage.value = appConfig.canCustomLanguage
  }

  const saveStorage = (option: { languageId?: string, canCustomLanguage?: string }) => {
    if (option.languageId) {
      languageId.value = option.languageId
      saveStorageAppConfig({
        languageId: option.languageId
      })
    }
    if (option.canCustomLanguage) {
      canCustomLanguage.value = option.canCustomLanguage
      saveStorageAppConfig({
        canCustomLanguage: option.canCustomLanguage
      })
    }
  }

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
    canCustomLanguage,
    init,
    saveStorage,
  };
});
