<template>
  <div ref="element" class="element"></div>
</template>
<script lang="ts">
export default {
  name: 'Waves'
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import setup from './index'

const element = ref<HTMLElement | null>(null)

onMounted(() => {
  setup(element.value)
})
</script>
<style type="less" scoped>
.element {
  width: 100%;
  height: 100%
}
</style>
