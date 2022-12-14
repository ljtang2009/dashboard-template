<template>
  <config-item>
    <template #title>{{ $t('appConfig.modules.product.title') }}</template>
    <template #content>
      <n-form :show-feedback="false" label-placement="left" show-require-mark>
        <n-form-item :label="$t('appConfig.modules.product.name')" path="productName">
          <n-input v-model:value="model.productName" size="small" type="text" clearable
            @update:value="updateProductName" />
        </n-form-item>
        <n-form-item :label="$t('appConfig.modules.product.logo')">
          <n-upload v-if="showLogoUpload" v-model:file-list="logoList" :accept="logoAcceptTypes.join(',')" :max="1"
            action="/api/admin/logo/save" :list-type="logoUploadListType" @before-upload="beforeUploadLogo"
            @preview="handlePreviewLogo" @change="handleLogoChange" @finish="handleLogoFinish">
            <n-upload-dragger>
              <div>
                <n-icon size="2rem" :component="FileUploadFilled" />
              </div>
              <n-text>{{ $t('appConfig.modules.product.dragOrClickToUpload') }}</n-text>
            </n-upload-dragger>
          </n-upload>
          <n-image v-show="false" ref="previewLogoImage" :src="previewLogoUrl" />
        </n-form-item>
      </n-form>
    </template>
  </config-item>
</template>
<script lang="ts">
export default {
  name: 'Product'
}
</script>
<script setup lang="ts">
import { ref, ComponentPublicInstance, nextTick } from 'vue';
import { UploadFileInfo, useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { FileUploadFilled } from '@vicons/material'
import { getFileTypeListByAcceptTypes } from '@/utils/input'
import { reset as resetLogo } from '@/api/admin/logo'
import useProductStore from '@/store/appConfig/product'
import appConfigDefault from '@/config/appConfigDefault'

const message = useMessage()
const { t } = useI18n()
const productStore = useProductStore()

const model = ref({
  productName: productStore.productName
})

const updateProductName = (value: string) => {
  productStore.$patch((state) => {
    state.productName = value
  })
}

const logoUrl = '/api/admin/logo/getStream'
const logoList = ref([
  {
    id: 'logo',
    name: 'logo.png',
    status: 'finished',
    url: `${logoUrl}?${productStore.logoTimestamp}`
  },
])

const previewLogoUrl = ref('')
const previewLogoImage = ref<ComponentPublicInstance>()

const logoAcceptTypes = ['image/png']
const logoAcceptTypesForMessage = getFileTypeListByAcceptTypes(logoAcceptTypes)
const logoMaxSize = 2 // TODO ?????????????????????

// ????????????favicon???????????????????????????????????????????????????????????????
// ??????build????????? src ??????logo ????????? public???
function setFavicon(value: string) {
  const faviconElement = document.querySelector("link[rel*='icon']")
  if (faviconElement) {
    faviconElement.setAttribute('href', value)
  }
}
// ????????????
function beforeUploadLogo(data: { file: UploadFileInfo }) {
  let error
  if (data.file.type && logoAcceptTypes.indexOf(data.file.type) === -1) {
    error = t('appConfig.modules.product.fileFormatError', logoAcceptTypesForMessage)
  }
  const logoMaxSizeByte = logoMaxSize * 1024 * 1024
  if (!error && data.file.file && data.file.file.size > logoMaxSizeByte) {
    error = t('appConfig.modules.product.fileMaxSizeError', { maxSize: `${logoMaxSize}MB` })
  }
  if (error) {
    message.error(error, {
      duration: 0,
      closable: true,
    })
    return false
  }
  return true
}

// ??????
function handlePreviewLogo(file: UploadFileInfo) {
  const { url } = file
  // ?????????????????????image??????
  const imgElement = previewLogoImage.value!.$el.getElementsByTagName('img')[0]
  if (!imgElement.onload) {
    imgElement.onload = () => {
      imgElement.click()
    }
  }
  // ????????????????????????
  if (previewLogoUrl.value === url) {
    imgElement.click()
  }
  else {
    // ???????????????????????????onload
    previewLogoUrl.value = url as string
  }
}

// const logoUploadListType = ref<'text' | 'image-card'>('text')
const logoUploadListType = ref<'text' | 'image-card'>('image-card')
// ??????
function handleLogoChange(data: { fileList: UploadFileInfo[] }) {
  if (data.fileList.length > 0) {
    if (logoUploadListType.value !== 'image-card') {
      logoUploadListType.value = 'image-card'
    }
  }
  else {
    if (logoUploadListType.value !== 'text') {
      logoUploadListType.value = 'text'
    }
  }
}

function handleLogoFinish({ file }: { file: UploadFileInfo }) {
  productStore.$patch((state) => {
    state.logoTimestamp = new Date().valueOf()
  })
  const _logoUrl = `${logoUrl}?${productStore.logoTimestamp}`
  file.url = _logoUrl
  setFavicon(_logoUrl)
}

const showLogoUpload = ref(true)

const getConfig = () => {
  return {
    productName: model.value.productName
  }
}

const reset = async () => {
  model.value.productName = appConfigDefault.productName
  productStore.$patch((state) => {
    state.logoTimestamp = new Date().valueOf()
  })
  const _logoUrl = `${logoUrl}?${productStore.logoTimestamp}`
  updateProductName(appConfigDefault.productName)
  await resetLogo()
  showLogoUpload.value = false
  if (logoList.value.length > 0) {
    logoList.value[0].url = _logoUrl
  }
  setFavicon(_logoUrl)
  await nextTick()
  showLogoUpload.value = true
}

defineExpose({
  getConfig,
  reset
})
</script>

