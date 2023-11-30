import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalActive: false,
  },
  getters: {},
  mutations: {
    toggleLoginWindow(state) {
      state.modalActive = !state.modalActive;
      state.modalActive
        ? document.body.classList.add("disable__body") //Навешиваем overflow hidden на body
        : document.body.classList.remove("disable__body");
    },
  },
  actions: {},
  modules: {},
});
