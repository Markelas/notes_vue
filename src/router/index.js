import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "MainLayout", auth: true }, //Нужна авторизация, чтобы войти на эту страницу
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "MainLayout", auth: false }, //Для посещения этой страницы авторизация не нужна
    component: () => import("../views/LoginPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Вызывается при смене роутера и можно добавить проверку на авторизацию
router.beforeEach((to, from, next) => {
  const currentUser = localStorage.getItem("user"); // Проверяем, есть ли активный юзер
  const requireAuth = to.matched.some((record) => record.meta.auth); //Проверяем, нужно ли на странице, чтобы пользователь был залогинен

  if (requireAuth && !currentUser) {
    // Если нужна авторизация, и пользователь не зашел
    next("/login"); // Перемещаем на страницу с логином
  } else {
    // Если все корректно
    next(); // Переход на нужную страницу
  }
});

export default router;
