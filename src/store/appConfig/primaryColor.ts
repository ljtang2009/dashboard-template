import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import primaryColors from '@/config/primaryColors';

export default defineStore('primaryColor', () => {
  const primaryColorId = ref<string>('');
  const isCustomPrimaryColor = ref<string>('');
  const customPrimaryColor = ref<string>('');

  const primaryColor = computed(() => {
    let result = '';
    if (isCustomPrimaryColor.value === 'Y') {
      result = customPrimaryColor.value;
    } else {
      for (const item of primaryColors) {
        if (item.id === primaryColorId.value) {
          result = item.color;
          break;
        }
      }
    }
    return result;
  });

  /**
   * 初始化
   * @param appConfig
   */
  const init = (appConfig: { primaryColorId: string, isCustomPrimaryColor: string, customPrimaryColor: string }) => {
    primaryColorId.value = appConfig.primaryColorId
    isCustomPrimaryColor.value = appConfig.isCustomPrimaryColor
    customPrimaryColor.value = appConfig.customPrimaryColor
  }

  return {
    /**
     * 主题色号
     */
    primaryColorId,
    /**
     * 是否自选主题色
     */
    isCustomPrimaryColor,
    /**
     * 自选主题色
     */
    customPrimaryColor,
    /**
     * 主题色值
     */
    primaryColor,
    init,
  };
});
