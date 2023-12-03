import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import notes from "./notes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalActive: false,
  },
  getters: {},
  mutations: {
    toggleBackgroundModalWindow(state) {
      state.modalActive = !state.modalActive;
      state.modalActive
        ? document.body.classList.add("disable__body") //Навешиваем overflow hidden на body
        : document.body.classList.remove("disable__body");
    },

    clearError(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {
    auth,
    notes,
  },
});
