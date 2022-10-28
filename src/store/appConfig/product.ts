import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('product', () => {
  const productName = ref<string>('');
  const logoTimestamp = ref<number>(new Date().valueOf());

  return {
    /**
     * 产品名称
     */
    productName,
    /**
     * logo时间戳，实现刷新
     */
    logoTimestamp,
  };
});
