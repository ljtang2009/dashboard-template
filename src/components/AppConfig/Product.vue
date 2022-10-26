<template>
  <config-item>
    <template #title>{{$t('appConfig.modules.product.title')}}</template>
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
              <n-text>{{$t('appConfig.modules.product.dragOrClickToUpload')}}</n-text>
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
import appConfigDefault from '@/config/appConfigDefault.json'

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
    url: `${logoUrl}?${(new Date()).valueOf()}`
  },
])

const previewLogoUrl = ref('')
const previewLogoImage = ref<ComponentPublicInstance>()

const logoAcceptTypes = ['image/png']
const logoAcceptTypesForMessage = getFileTypeListByAcceptTypes(logoAcceptTypes)
const logoMaxSize = 2 // TODO 和后端同步配置

// 变更页面favicon，而不是直接替换对应文件，否则页面会刷新。
// 重新build，会把 src 中的logo 覆盖到 public中
function setFavicon(value: string) {
  const faviconElement = document.querySelector("link[rel*='icon']")
  if (faviconElement) {
    faviconElement.setAttribute('href', value)
  }
}
// 检查文件
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

// 预览
function handlePreviewLogo(file: UploadFileInfo) {
  const { url } = file
  // 获取预览组件的image元素
  const imgElement = previewLogoImage.value!.$el.getElementsByTagName('img')[0]
  if (!imgElement.onload) {
    imgElement.onload = () => {
      imgElement.click()
    }
  }
  // 如果预览图片不变
  if (previewLogoUrl.value === url) {
    imgElement.click()
  }
  else {
    // 改变预览图片，触发onload
    previewLogoUrl.value = url as string
  }
}

// const logoUploadListType = ref<'text' | 'image-card'>('text')
const logoUploadListType = ref<'text' | 'image-card'>('image-card')
// 改变
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
  const _logoUrl = `${logoUrl}?${(new Date()).valueOf()}`
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

  const _logoUrl = `${logoUrl}?${(new Date()).valueOf()}`
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

