import { createRouter, createWebHashHistory } from 'vue-router';
import useRouterStore from '@/store/router';

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/user/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/view/user/Register.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/page3',
    name: 'Page3',
    component: () => import('@/view/user/Page3.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeResolve(async (to) => {
  const routerStore = useRouterStore();
  routerStore.setTitle(to.meta['title'] as string);
});

export default router;
