import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "MainLayout", auth: true },
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

// Вызывается при смене роутера и можно добавить проверку на авторизацию
// router.beforeEach((to, from, next) => {
//   const currentUser =  // Проверяем, есть ли что-то, если да, то пользователь залогинился
//   const requireAuth = to.matched.some(record => record.meta.auth) // Проверка, нужна ли авторизация
//
//   if (requireAuth && !currentUser) { // Если нужна авторизация, а пользователь не зашел
//     next('/login?message=login') // Показываем сообщение и перемещаем на страницу с логином
//   } else { // Если все корректно
//     next() // Переход на нужную страницу
//   }
// })

export default router;
