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
        <primary-color-selector ref="primary-color-selector-component" />
        <n-divider />
        <language-selector ref="language-selector-component" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import DragHandle from '@/components/AppConfig/DragHandle.vue'
import { save as saveAppConfig } from '@/api/dev/appConfig'
import { useMessage } from 'naive-ui'
import PrimaryColorSelector from '@/components/AppConfig/PrimaryColorSelector.vue'
import LanguageSelector from '@/components/AppConfig/LanguageSelector.vue'

export default defineComponent({
  name: 'AppConfig',
  components: {
    DragHandle,
    PrimaryColorSelector,
    LanguageSelector
  },
  setup() {
    const message = useMessage()

    const visible = ref(false)

    const isSaving = ref(false)

    const primaryColorSelectorComponent = ref(PrimaryColorSelector);
    const languageSelectorComponent = ref(LanguageSelector);

    async function save() {
      isSaving.value = true
      try {
        await saveAppConfig({
          ...(primaryColorSelectorComponent.value && primaryColorSelectorComponent.value['getConfig']()),
          ...(languageSelectorComponent.value && languageSelectorComponent.value['getConfig']())
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
      save,
      'primary-color-selector-component': primaryColorSelectorComponent,
      'language-selector-component': languageSelectorComponent
    }
  }
})
</script>
