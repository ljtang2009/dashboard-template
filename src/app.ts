import { createApp } from 'vue/dist/vue.esm-bundler';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { setupI18n } from '@/i18n';
import router from '@/router';
import '@/style/global.less';

import bootstrap from '@/bootstrap';

async function init() {
  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  await bootstrap();
  const i18n = await setupI18n();
  app.use(i18n);
  app.use(router);
  app.mount('#app');
}

init();
