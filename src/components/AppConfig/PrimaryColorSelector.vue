<template>
  <config-item>
    <template #title>{{ $t('appConfig.modules.primaryColor.title') }}</template>
    <template #content>
      <n-space vertical>
        <div>
          <n-space size="small">
            <n-tag v-for="(item, index) in primaryColors" :key="index" size="small" :bordered="false"
              :color="{ color: item.color }" class="tappable" @click="selectSwatch(item)">
              <n-icon size="14" color="#ffffff"
                :style="{ visibility: primaryColorStore.isCustomPrimaryColor !== 'Y' && primaryColorStore.primaryColorId === item.id ? 'visible' : 'hidden' }">
                <check-twotone />
              </n-icon>
            </n-tag>
            <div style="width: 100px;">
              <n-color-picker v-model:value="primaryColorStore.customPrimaryColor" :show-alpha="false" size="small"
                :actions="['confirm']" :modes="['hex', 'rgb', 'hsl', 'hsv']" @confirm="selectCustomColor">
                <template #label>
                  <n-space size="small">
                    <span style="color: #ffffff">{{ $t('appConfig.modules.primaryColor.Manual') }}</span>
                    <n-icon v-if="primaryColorStore.isCustomPrimaryColor === 'Y'" size="14" color="#ffffff"
                      :component="CheckTwotone" />
                  </n-space>
                </template>
              </n-color-picker>
            </div>
          </n-space>
        </div>
      </n-space>
    </template>
  </config-item>
</template>

<script lang="ts">
export default {
  name: 'PrimaryColorSelector'
}
</script>
<script setup lang="ts">
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import { CheckTwotone } from '@vicons/material'
import primaryColors, { colorType as primaryColorType } from '@/config/primaryColors'
import usePrimaryColorStore from '@/store/appConfig/primaryColor'
import appConfigDefault from '@/config/appConfigDefault'

const primaryColorStore = usePrimaryColorStore()

const selectSwatch = (colorItem: primaryColorType) => {
  primaryColorStore.$patch((state) => {
    state.isCustomPrimaryColor = 'N'
    state.primaryColorId = colorItem.id
  })
}

const selectCustomColor = (value: string) => {
  primaryColorStore.$patch((state) => {
    state.isCustomPrimaryColor = 'Y'
    state.customPrimaryColor = value
  })
}

const getConfig = () => {
  return {
    primaryColorId: primaryColorStore.primaryColorId,
    isCustomPrimaryColor: primaryColorStore.isCustomPrimaryColor,
    customPrimaryColor: primaryColorStore.customPrimaryColor
  }
}

const reset = () => {
  primaryColorStore.$patch((state) => {
    state.primaryColorId = appConfigDefault.primaryColorId
    state.isCustomPrimaryColor = appConfigDefault.isCustomPrimaryColor
    state.customPrimaryColor = appConfigDefault.customPrimaryColor
  })
}

defineExpose({
  getConfig,
  reset
})
</script>

<style lang="less" scoped>
.tappable {
  cursor: pointer;
}
</style>
