export default {
  state: {
    activeUser: {},
  },
  mutations: {
    updateActiveUser(state, user) {
      console.log("updateActiveUser", user);
      state.activeUser = user;
    },
  },
  actions: {
    async register(context, newUser) {
      //Делаем запрос для регистрации
      console.log(newUser);
      try {
        await fetch("https://dist.nd.ru/api/reg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: newUser.email,
            password: newUser.password,
            confirm_password: newUser.confirm_password,
          }),
        }).then((resp) => resp.text());
        context.commit("updateActiveUser", newUser); //Вызываем мутацию, чтобы обновить в state активного пользователя
      } catch (e) {
        context.commit("setError", e);
        console.log(e);
      }
    },
    async checkAuth({ commit }) {
      try {
        await fetch("https://dist.nd.ru/api/auth", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).catch((Error) => console.log(Error));
      } catch (e) {
        commit("setError", e);
        console.log(e);
      }
    },
    async login(context, loginUser) {
      try {
        await fetch("https://dist.nd.ru/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginUser.email,
            password: loginUser.password,
          }),
        });
        context.commit("updateActiveUser", loginUser); //Вызываем мутацию, чтобы обновить в state активного пользователя
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
};
