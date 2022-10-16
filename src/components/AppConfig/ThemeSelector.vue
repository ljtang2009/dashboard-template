<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.theme.title')}}</template>
    <template #content>
      <n-switch v-model:value="isDark" size="small" :rail-style="railStyle" @update:value="update">
        <template #checked>{{$t('appConfig.modules.theme.light')}}</template>
        <template #unchecked>{{$t('appConfig.modules.theme.dark')}}</template>
        <template #checked-icon>
          <n-icon :component="LightModeFilled" color="#F4A460" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="ModeNightRound" color="#F4A460" />
        </template>
      </n-switch>
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'ThemeSelector'
}
</script>
<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import useThemeStore from '@/store/appConfig/theme'
import ThemeType from '@/config/theme';
import appConfigDefault from '@/config/appConfigDefault.json'
import { LightModeFilled, ModeNightRound } from '@vicons/material'

const themeStore = useThemeStore()
const isDark = ref<boolean>(themeStore.isDark)

const update = (value: boolean) => {
  themeStore.$patch((state) => {
    state.themeId = value ? ThemeType.dark : ThemeType.light
  })
}

const railStyle = (_info: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {}
  style.backgroundColor = '#003366'
  return style
}

const getConfig = () => {
  return {
    themeId: themeStore.themeId
  }
}

const reset = () => {
  themeStore.$patch((state) => {
    state.themeId = appConfigDefault.themeId
  })
  isDark.value = themeStore.isDark
}

defineExpose({
  getConfig,
  reset
})
</script>
