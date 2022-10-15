<template>
  <config-item>
    <template #title>主题</template>
    <template #content>

    </template>
  </config-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'

export default defineComponent({
  name: 'ThemeSelector',
  components: {
    ConfigItem,
  },
  setup() {
    const getConfig = () => {
      return {
      }
    }

    const reset = () => {

    }

    return {
      getConfig,
      reset
    }
  }
})
</script>
