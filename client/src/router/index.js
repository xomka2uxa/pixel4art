import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FreePaint from "../views/FreePaint.vue";
import AppTest from "../views/AppTest.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/free-paint",
    name: "FreePaint",
    component: FreePaint,
  },

  {
    path: "/test",
    name: "test",
    component: AppTest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
