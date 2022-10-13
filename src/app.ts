import { createApp } from 'vue/dist/vue.esm-bundler';
import App from '@/App.vue';
import { createPinia } from 'pinia';
// import router from '@/router';

import '@/style/global.less';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

// app.use(router);

app.mount('#app');
