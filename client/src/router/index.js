import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FreePaint from "../views/FreePaint.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
