<template>
  <n-space vertical>
    <div>
      <n-text strong>
        主题色
      </n-text>
    </div>
    <div>
      <n-space size="small">
        <n-popover v-for="(item, index) in primaryColors" :key="index">
          <template #trigger>
            <n-tag size="small" :bordered="false" :color="{color: item.color}" class="tappable"
              @click="selectSwatch(item)">
              <n-icon size="14" color="#ffffff"
                :style="{visibility: !isCustomPrimaryColor && primaryColorId === item.id ? 'visible' : 'hidden'}">
                <check-twotone />
              </n-icon>
            </n-tag>
          </template>
          {{item.name}}
        </n-popover>
      </n-space>
    </div>
    <div>
      <n-color-picker v-model:value="customPrimaryColor" :show-alpha="false" size="small" :actions="['confirm']"
        :modes="['hex', 'rgb', 'hsl', 'hsv']" @confirm="selectCustomColor">
        <template #label>
          <n-space size="small">
            <span style="color: #ffffff">自选</span>
            <n-icon v-if="isCustomPrimaryColor" size="14" color="#ffffff">
              <check-twotone />
            </n-icon>
          </n-space>
        </template>
      </n-color-picker>
    </div>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CheckTwotone } from '@vicons/material'
import primaryColors, { colorType as primaryColorType } from '@/config/primaryColors'
import useThemeStore from '@/store/theme'

export default defineComponent({
  name: 'ThemeColorSelector',
  components: {
    CheckTwotone
  },
  setup() {
    const themeStore = useThemeStore()

    const primaryColorId = ref<string>('006');
    const isCustomPrimaryColor = ref<boolean>(false);
    const customPrimaryColor = ref<string>('#FF5C93');


    const selectSwatch = (colorItem: primaryColorType) => {
      isCustomPrimaryColor.value = false
      primaryColorId.value = colorItem.id
      themeStore.$patch((state) => {
        state.isCustomPrimaryColor = false
        state.primaryColorId = colorItem.id
      })
    }

    const selectCustomColor = (value: string) => {
      isCustomPrimaryColor.value = true
      customPrimaryColor.value = value
      themeStore.$patch((state) => {
        state.isCustomPrimaryColor = true
        state.customPrimaryColor = value
      })
    }

    return {
      primaryColors,
      primaryColorId,
      isCustomPrimaryColor,
      customPrimaryColor,
      selectSwatch,
      selectCustomColor
    }
  }
})
</script>

<style lang="less" scoped>
.tappable {
  cursor: pointer;
}
</style>
