import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAppConfig } from '@/config/appConfig';

export default defineStore('product', () => {
  const appConfig = getAppConfig();
  const productName = ref<string>(appConfig['productName']);

  return {
    /**
     * 产品名称
     */
    productName,
  };
});
