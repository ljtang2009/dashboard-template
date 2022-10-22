<template>
  <div ref="userLayout" class="user-layout">
    <div :class="boxClass">
      <n-space align="center" justify="center" class="title">
        <img class="logo" src="@/assets/logo.png" />
        <n-text class="product-name" strong>{{productStore.productName}}</n-text>
      </n-space>
      <router-view />
    </div>
    <component :is="cssEffect"></component>
  </div>
</template>
<script lang="ts">
export default {
  name: 'UserLayout'
}
</script>
<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import useProductStore from '@/store/appConfig/product'
import useThemeStore from '@/store/appConfig/theme'

const productStore = useProductStore()
const themeStore = useThemeStore()

const userLayout = ref(null)
const boxClass = ref<Array<string>>([])
const cssEffect = shallowRef()

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

onMounted(() => {
  const cssEffectComponentName = 'FluidSimulation'
  import(`@/components/CSSEffect/${cssEffectComponentName}/index.vue`).then(CSSEffectComponent => {
    cssEffect.value = CSSEffectComponent.default
  })
})

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

  .box {
    width: 18rem;
    padding: 2rem;
    border-radius: 0.5rem;
    backdrop-filter: blur(0.5rem);
    position: fixed;
    z-index: 2;

    .title {
      padding-bottom: 2rem;

      .logo {
        height: 3rem;
      }

      .product-name {
        font-size: 2rem
      }
    }
  }

  .light-box {
    background-color: rgba(255, 255, 255, .8);
  }

  .dark-box {
    background-color: rgba(0, 0, 0, .8);
  }

}
</style>
