<template>
  <div ref="userLayout" class="user-layout">
    <div class="toolbar">
      <language-selector v-if="languageStore.canCustomLanguage === 'Y'" />
    </div>
    <!-- <div :class="boxClass"> -->
    <div class="box">
      <n-space align="center" justify="center" class="title">
        <div class="title-item">
          <img class="logo" :src="`/api/admin/logo/getStream?${productStore.logoTimestamp}`" />
        </div>
        <div class="title-item">
          <n-text class="product-name" strong>{{ productStore.productName }}</n-text>
        </div>
      </n-space>
      <router-view />
    </div>
    <!-- <component :is="cssEffect"></component> -->
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserLayout'
}
</script>
<script setup lang="ts">
import {
  ref,
  // onMounted,
  // shallowRef
} from 'vue'
import useProductStore from '@/store/appConfig/product'
import useThemeStore from '@/store/appConfig/theme'
import useLanguageStore from '@/store/appConfig/language'
import LanguageSelector from '@/components/LanguageSelector/index.vue'

const productStore = useProductStore()
const themeStore = useThemeStore()
const languageStore = useLanguageStore()

const userLayout = ref(null)
const boxClass = ref<Array<string>>([])
// const cssEffect = shallowRef()

function setBoxClass() {
  boxClass.value = [
    'box',
    themeStore.isDark ? 'dark-box' : 'light-box'
  ]
}
setBoxClass()

themeStore.$subscribe((_mutation, _state) => {
  setBoxClass()
})

// onMounted(() => {
//   const cssEffectComponentName = 'FluidSimulation'
//   import(`@/components/CSSEffect/${cssEffectComponentName}/index.vue`).then(CSSEffectComponent => {
//     cssEffect.value = CSSEffectComponent.default
//   })
// })

</script>
<style lang="less" scoped>
.user-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-image: url('@/assets/background.jpg');
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .toolbar {
    position: fixed;
    z-index: 2;
    top: 2rem;
    right: 2rem;
  }

  .box {
    width: 18rem;
    padding: 2rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(0.5rem);
    position: fixed;
    z-index: 2;
    box-shadow: 0px 0px 8px 4px #999999;

    .title {
      padding-bottom: 2rem;

      .title-item {
        line-height: 1;
      }

      .logo {
        height: 3rem;
      }

      .product-name {
        font-size: 2rem
      }
    }
  }

  // .light-box {
  //   background-color: rgba(255, 255, 255, .8);
  // }

  // .dark-box {
  //   background-color: rgba(0, 0, 0, .8);
  // }

}
</style>
