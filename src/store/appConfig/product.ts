import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('product', () => {
  const productName = ref<string>('');
  const logoTimestamp = ref<number>(new Date().valueOf());

  /**
   * 初始化
   * @param appConfig
   */
  const init = (appConfig: { productName: string }) => {
    productName.value = appConfig.productName
  }

  return {
    /**
     * 产品名称
     */
    productName,
    /**
     * logo时间戳，实现刷新
     */
    logoTimestamp,
    init,
  };
});
