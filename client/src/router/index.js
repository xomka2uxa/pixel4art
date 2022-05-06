import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostsView from '../views/PostsView.vue';
import FreePaint from '../views/FreePaint.vue';
import PaintKonva from '../views/PaintKonva.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/free-paint',
    name: 'FreePaint',
    component: FreePaint,
  },
  {
    path: '/paint-konva',
    name: 'PaintKonva',
    component: PaintKonva,
  },
  {
    path: '/posts',
    name: 'PostsView',
    component: PostsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
