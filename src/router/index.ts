import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import TokenHelper from '@/helpers/TokenHelper';
import AuthenticationService from '@/services/AuthenticationService';
// import middleware from '@/middleware/authentication';
// import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/get-link',
    component: () => import(/* webpackChunkName: "auth" */ '@/pages/auth/auth.vue'),
    children: [
      {
        path: 'get-link',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/auth/get-link/index.vue'),
      },
      {
        path: 'magic-link',
        component: () => import(/* webpackChunkName: "auth" */ '@/pages/auth/magic-link/index.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    redirect: '/profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/pages/profile/index.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "profile" */ '@/pages/profile/read/index.vue'),
        // beforeEnter: (to, from, next) => {
        //   // ...
        // }
      },
      {
        path: 'edit',
        component: () => import(/* webpackChunkName: "profile" */ '@/pages/profile/edit/index.vue'),
      },
    ],
  },
  {
    path: '*',
    name: 'Page404',
    component: () => import(/* webpackChunkName: "page404" */ '@/views/Page404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('aa', to.path === '/auth/get-link');
  console.log('access', TokenHelper.getToken('accessToken'));
  console.log('refreshToken', TokenHelper.getToken('refreshToken'));
  // if (['/auth/get-link'].includes(to.path)) {
  if (['/auth/get-link', '/auth/magic-link'].includes(to.path)) {
    next();
  } else {
    console.log('1');
    if (TokenHelper.getToken('accessToken')) {
      console.log('2');
      // await store.dispatch('user/getSelf');

      next();
    }

    if (TokenHelper.getToken('refreshToken')) {
      console.log('3');
      try {
        const { accessToken, refreshToken } = await AuthenticationService.postRefreshToken(TokenHelper.getToken('refreshToken'));
        TokenHelper.setToken('accessToken', accessToken);
        TokenHelper.setToken('refreshToken', refreshToken);
        // await store.dispatch('user/getSelf');

        next();
      } catch (e) {
        console.log('4');
        // eslint-disable-next-line consistent-return
        next('/auth/get-link');
      }
    }
    console.log('5');

    // next('/auth/get-link');
    next();
  }
});

export default router;
