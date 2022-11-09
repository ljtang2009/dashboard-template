<template>
  <n-space vertical>
    <n-space justify="space-between">
      <n-text strong>
        <slot name="title"></slot>
      </n-text>
      <div>
        <slot name="right-title"></slot>
      </div>
    </n-space>
    <div>
      <slot name="content"></slot>
    </div>
  </n-space>
</template>
<script lang="ts">
export default {
  name: 'ConfigItem',
}
</script>
