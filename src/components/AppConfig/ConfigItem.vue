<template>
  <n-space vertical>
    <div>
      <n-text strong>
        <slot name="title"></slot>
      </n-text>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ConfigItem',
})
</script>
