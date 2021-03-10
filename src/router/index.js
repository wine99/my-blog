import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Write from '../views/Write.vue';
import ArticlePage from '../views/ArticlePage.vue';

Vue.use(VueRouter);

const routes = [
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
    component: About,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/write',
    name: 'Write',
    component: Write,
    beforeEnter: (to, from, next) => {
      if (window.localStorage.getItem('userInfo')) {
        next();
      } else {
        next(new Error('请先登录'));
      }
    },
  },
  {
    path: '/article/:id',
    name: 'ArticlePage',
    component: ArticlePage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
