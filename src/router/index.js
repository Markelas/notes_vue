import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "MainLayout" },
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "MainLayout" },
    component: () => import("../views/LoginPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
