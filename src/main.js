import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/style.scss"; //Основной файл со стилями
import "../src/assets/media.scss"; //Файл с @media

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
