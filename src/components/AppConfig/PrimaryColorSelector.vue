<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.primaryColor.title')}}</template>
    <template #content>
      <n-space vertical>
        <div>
          <n-space size="small">
            <n-tag v-for="(item, index) in primaryColors" :key="index" size="small" :bordered="false"
              :color="{color: item.color}" class="tappable" @click="selectSwatch(item)">
              <n-icon size="14" color="#ffffff"
                :style="{visibility: !isCustomPrimaryColor && primaryColorId === item.id ? 'visible' : 'hidden'}">
                <check-twotone />
              </n-icon>
            </n-tag>
          </n-space>
        </div>
        <div>
          <n-color-picker v-model:value="customPrimaryColor" :show-alpha="false" size="small" :actions="['confirm']"
            :modes="['hex', 'rgb', 'hsl', 'hsv']" @confirm="selectCustomColor">
            <template #label>
              <n-space size="small">
                <span style="color: #ffffff">{{$t('appConfig.modules.primaryColor.Manual')}}</span>
                <n-icon v-if="isCustomPrimaryColor" size="14" color="#ffffff">
                  <check-twotone />
                </n-icon>
              </n-space>
            </template>
          </n-color-picker>
        </div>
      </n-space>
    </template>
  </config-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConfigItem from '@/components/AppConfig/ConfigItem.vue'
import { CheckTwotone } from '@vicons/material'
import primaryColors, { colorType as primaryColorType } from '@/config/primaryColors'
import usePrimaryColorStore from '@/store/appConfig/primaryColor'

export default defineComponent({
  name: 'PrimaryColorSelector',
  components: {
    ConfigItem,
    CheckTwotone
  },
  setup() {
    const primaryColorStore = usePrimaryColorStore()

    const primaryColorId = ref<string>(primaryColorStore.primaryColorId);
    const isCustomPrimaryColor = ref<boolean>(primaryColorStore.isCustomPrimaryColor);
    const customPrimaryColor = ref<string>(primaryColorStore.customPrimaryColor);

    const selectSwatch = (colorItem: primaryColorType) => {
      isCustomPrimaryColor.value = false
      primaryColorId.value = colorItem.id
      primaryColorStore.$patch((state) => {
        state.isCustomPrimaryColor = false
        state.primaryColorId = colorItem.id
      })
    }

    const selectCustomColor = (value: string) => {
      isCustomPrimaryColor.value = true
      customPrimaryColor.value = value
      primaryColorStore.$patch((state) => {
        state.isCustomPrimaryColor = true
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

    return {
      primaryColors,
      primaryColorId,
      isCustomPrimaryColor,
      customPrimaryColor,
      selectSwatch,
      selectCustomColor,
      getConfig
    }
  }
})
</script>

<style lang="less" scoped>
.tappable {
  cursor: pointer;
}
</style>
