import { defineStore } from 'pinia';
import { ref } from 'vue';
import useProductStore from '@/store/appConfig/product';

export default defineStore('router', () => {
  const productStore = useProductStore();
  const productName = ref(productStore.productName);

  const title = ref();
  const setTitle = (value: string) => {
    if (value) {
      title.value = value;
      let documentTitle = title.value;
      if (productName.value) {
        documentTitle += ` | ${productName.value}`;
      }
      document.title = documentTitle;
    }
  };

  // 监听产品名称变化
  productStore.$subscribe((_mutation, state) => {
    productName.value = state.productName.trim();
    setTitle(title.value);
  });

  return {
    title,
    setTitle,
  };
});
