<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.theme.title')}}</template>
    <template #content>
      <n-button-group size="small">
        <n-button v-for="(item, index) in buttonList" :key="index"
          :round="index === 0 || index === buttonList.length -1"
          :type="themeStore.themeId === item.value ? 'primary' : 'default'" @click="update(item.value)">
          {{$t(item.name)}}
          <!-- 放图标空间不够 -->
          <!-- <template v-if="item.icon" #icon>
            <n-icon :component="item.icon" />
          </template> -->
        </n-button>
      </n-button-group>
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'ThemeSelector'
}
</script>
<script setup lang="ts">
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import useThemeStore from '@/store/appConfig/theme'
import ThemeType from '@/config/theme';
import appConfigDefault from '@/config/appConfigDefault.json'
// import { LightModeFilled, ModeNightRound, DesktopWindowsFilled } from '@vicons/material'

const themeStore = useThemeStore()
const buttonList = [
  {
    name: 'appConfig.modules.theme.light',
    value: ThemeType.light,
    // icon: LightModeFilled
  },
  {
    name: 'appConfig.modules.theme.dependOnOs',
    value: ThemeType.os,
    // icon: DesktopWindowsFilled
  },
  {
    name: 'appConfig.modules.theme.dark',
    value: ThemeType.dark,
    // icon: ModeNightRound
  }
]

const update = (value: ThemeType) => {
  themeStore.$patch((state) => {
    state.themeId = value
  })
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
}

defineExpose({
  getConfig,
  reset
})
</script>
