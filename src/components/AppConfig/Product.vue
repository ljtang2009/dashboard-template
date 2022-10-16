<template>
  <config-item>
    <template #title>产品</template>
    <template #content>
      <n-form :show-feedback="false" label-placement="left" show-require-mark>
        <n-form-item label="名称" path="productName">
          <n-input v-model:value="model.productName" size="small" type="text" clearable
            @update:value="updateProductName" />
        </n-form-item>
        <n-form-item label="商标">
          <n-input v-model:value="model.productName" size="small" type="text" clearable />
        </n-form-item>
      </n-form>
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'Product'
}
</script>
<script setup lang="ts">
import { ref } from 'vue';
import useProductStore from '@/store/appConfig/product'
import appConfigDefault from '@/config/appConfigDefault.json'

const productStore = useProductStore()

const model = ref({
  productName: productStore.productName
})

const updateProductName = (value: string) => {
  productStore.$patch((state) => {
    state.productName = value
  })
}

const getConfig = () => {
  return {
    productName: model.value.productName
  }
}

const reset = () => {
  model.value.productName = appConfigDefault.productName
  updateProductName(appConfigDefault.productName)
}

defineExpose({
  getConfig,
  reset
})
</script>

