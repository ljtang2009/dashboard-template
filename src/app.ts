import { createApp } from 'vue/dist/vue.esm-bundler';
import App from '@/App.vue';
import { createPinia } from 'pinia';
import { setupI18n } from '@/i18n';
import { get as getAppConfig } from '@/api/dev/app-config';
import router from '@/router';
import '@/style/global.less';

const isProd = process.env['NODE_ENV'] === 'production';

async function init() {
  if (!isProd) {
    window.appConfig = (await getAppConfig()) as Record<string, any>;
  }

  const pinia = createPinia();
  const app = createApp(App);
  app.use(pinia);
  const i18n = await setupI18n();
  app.use(i18n);
  app.use(router);

  app.mount('#app');
}

init();
