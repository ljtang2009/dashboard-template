import { createApp } from 'vue/dist/vue.esm-bundler';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { setupI18n } from '@/i18n';
import { read as readAppConfig } from '@/api/dev/appConfig';

const isProd = process.env['NODE_ENV'] === 'production';

// import router from '@/router';

import '@/style/global.less';

async function init() {
  if (!isProd) {
    window.appConfig = (await readAppConfig()) as Record<string, any>;
  }

  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  const i18n = await setupI18n();
  app.use(i18n);

  // app.use(router);

  app.mount('#app');
}

init();
