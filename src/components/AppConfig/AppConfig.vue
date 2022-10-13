<template>
  <div>
    <drag-handle @tap="visible = !visible" />
    <n-drawer v-model:show="visible" display-directive="show">
      <n-drawer-content>
        <template #header>
          Header
        </template>
        <template #footer>
          <n-space>
            <n-button type="primary" :loading="isSaving" @click="save">保存</n-button>
            <n-button @click="visible = false">关闭</n-button>
          </n-space>
        </template>
        <theme-color-selector />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import DragHandle from '@/components/AppConfig/DragHandle.vue'
import ThemeColorSelector from '@/components/AppConfig/ThemeColorSelector.vue'
import { save as saveAppConfig } from '@/api/dev/appConfig'
import useThemeStore from '@/store/theme'
import { useMessage } from 'naive-ui'

export default defineComponent({
  name: 'AppConfig',
  components: {
    DragHandle,
    ThemeColorSelector
  },
  setup() {
    const message = useMessage()

    const visible = ref(false)

    const isSaving = ref(false)

    async function save() {
      isSaving.value = true
      const themeStore = useThemeStore()
      try {
        await saveAppConfig({
          primaryColorId: themeStore.primaryColorId,
          isCustomPrimaryColor: themeStore.isCustomPrimaryColor,
          customPrimaryColor: themeStore.customPrimaryColor
        })
      }
      catch (e) {
        return
      }
      finally {
        isSaving.value = false
      }
      message.success('保存成功')
    }

    return {
      visible,
      isSaving,
      save
    }
  }
})
</script>
