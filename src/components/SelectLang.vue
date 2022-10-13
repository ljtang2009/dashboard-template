<template>
  <div>
    <!-- <a-dropdown>
      <global-outlined />
      <template #overlay>
        <a-menu v-model:selectedKeys="selectedKeys" @click="changeLang">
          <a-menu-item v-for="locale in locales" :key="locale.value">
            {{locale.label}}
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown> -->
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import { GlobalOutlined } from '@ant-design/icons-vue'
// import type { MenuProps } from 'ant-design-vue';

export default defineComponent({
  name: 'SelectLang',
  components: {
    // GlobalOutlined
  },
  setup() {

    // const locales = [
    //   {
    //     value: 'zh-CN',
    //     label: '简体中文',
    //   },
    //   {
    //     value: 'en-US',
    //     label: 'English',
    //   }
    // ]

    // const selectedKeys = ref([locales[0].value])

    // const changeLang: MenuProps['onClick'] = menuInfo => {
    //   if (menuInfo.key !== selectedKeys.value[0]) {
    //     selectedKeys.value[0] = menuInfo.key as string
    //   }
    // };

    // return {
    //   locales,
    //   selectedKeys,
    //   changeLang
    // }
  }
})
</script>
