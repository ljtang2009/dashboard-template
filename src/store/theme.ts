import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import primaryColors from '@/config/primaryColors';
import appConfig from '@/config/app.json';

export default defineStore('theme', () => {
  const primaryColorId = ref<string>(appConfig.primaryColorId);
  const isCustomPrimaryColor = ref<boolean>(appConfig.isCustomPrimaryColor);
  const customPrimaryColor = ref<string>(appConfig.customPrimaryColor);

  const primaryColor = computed(() => {
    let result = '';
    if (isCustomPrimaryColor.value) {
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
  };
});
