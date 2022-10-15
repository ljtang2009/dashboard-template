<template>
  <div>
    <drag-handle @tap="visible = !visible" />
    <n-drawer v-model:show="visible" display-directive="show">
      <n-drawer-content>
        <template #header>
          Header
        </template>
        <template #footer>
          <n-space size="small">
            <n-button size="small" type="primary" :loading="isSaving" @click="save">{{$t('appConfig.save')}}</n-button>
            <n-button size="small" type="warning" @click="reset">{{$t('appConfig.reset')}}</n-button>
            <n-button size="small" @click="visible = false">{{$t('appConfig.close')}}</n-button>
          </n-space>
        </template>
        <primary-color-selector ref="primary-color-selector-component" />
        <n-divider />
        <language-selector ref="language-selector-component" />
        <n-divider />
        <theme-selector ref="theme-selector-component" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import DragHandle from '@/components/AppConfig/DragHandle.vue'
import { save as saveAppConfig } from '@/api/dev/appConfig'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import PrimaryColorSelector from '@/components/AppConfig/PrimaryColorSelector.vue'
import LanguageSelector from '@/components/AppConfig/LanguageSelector.vue'
import ThemeSelector from '@/components/AppConfig/ThemeSelector.vue'

export default defineComponent({
  name: 'AppConfig',
  components: {
    DragHandle,
    PrimaryColorSelector,
    LanguageSelector,
    ThemeSelector
  },
  setup() {
    const message = useMessage()
    const { t } = useI18n()

    const visible = ref(false)
    const isSaving = ref(false)

    const components: Array<Ref> = []
    const primaryColorSelectorComponent = ref(PrimaryColorSelector);
    components.push(primaryColorSelectorComponent)
    const languageSelectorComponent = ref(LanguageSelector);
    components.push(languageSelectorComponent)
    const themeSelectorComponent = ref(ThemeSelector);
    components.push(themeSelectorComponent)

    async function save() {
      isSaving.value = true
      let appConfigData = {}
      for (const component of components) {
        const getConfigFunction = component.value['getConfig']
        if (getConfigFunction) {
          appConfigData = { ...appConfigData, ...(getConfigFunction()) }
        }
      }
      try {
        await saveAppConfig(appConfigData)
      }
      catch (e) {
        return
      }
      finally {
        isSaving.value = false
      }
      message.success(t('appConfig.callback.saveSuccessfully'))
    }

    function reset() {
      for (const component of components) {
        const resetFunction = component.value['reset']
        if (resetFunction) {
          resetFunction()
        }
      }
    }

    return {
      visible,
      isSaving,
      save,
      reset,
      'primary-color-selector-component': primaryColorSelectorComponent,
      'language-selector-component': languageSelectorComponent,
      'theme-selector-component': themeSelectorComponent
    }
  }
})
</script>
