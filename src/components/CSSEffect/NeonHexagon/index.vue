<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>
<script lang="ts">
export default {
  name: 'NeonHexagon'
}
</script>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import setup from './index'

const canvas = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)

onMounted(async () => {
  if (canvas.value) {
    const parentElement = canvas.value.parentElement
    width.value = parentElement!.offsetWidth
    height.value = parentElement!.offsetHeight
    await nextTick()
    setup(canvas.value)
  }
})

</script>
s
