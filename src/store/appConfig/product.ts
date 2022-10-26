import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('product', () => {
  const productName = ref<string>('');

  return {
    /**
     * 产品名称
     */
    productName,
  };
});
