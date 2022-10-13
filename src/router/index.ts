import { createRouter, createWebHashHistory } from 'vue-router';

import constantRouterMap from '@/router/map/constantRouterMap'

export default createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
});
