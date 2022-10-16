<template>
  <config-item>
    <template #title>产品</template>
    <template #content>
      名称
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'Product'
}
</script>
<script setup lang="ts">

const getConfig = () => {
  return {
  }
}

const reset = () => {
}

defineExpose({
  getConfig,
  reset
})
</script>

