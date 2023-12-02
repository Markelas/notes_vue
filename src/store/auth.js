export default {
  state: {
    activeUser: localStorage.getItem("user") || null,
    token: "",
    errorText: "",
  },
  mutations: {
    updateActiveUser(state, user, token) {
      state.token = token;
      state.activeUser = user.email;
    },
    addError(state, error) {
      state.errorText = error;
    },
  },
  actions: {
    async register(context, newUser) {
      //Делаем запрос для регистрации
      try {
        const response = await fetch("https://dist.nd.ru/api/reg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          cache: "default",
          body: JSON.stringify({
            email: newUser.email,
            password: newUser.password,
            confirm_password: newUser.confirm_password,
          }),
        }).then((resp) => resp);
        // if (!response.statusCode) {
        //   context.commit("updateActiveUser", newUser); //Вызываем мутацию, чтобы обновить в state активного пользователя
        // }
        let error = await response.json();
        let errorMessage = await error.message;
        context.commit("addError", errorMessage);
        return response;
      } catch (e) {
        context.commit("setError", e);
      }
    },

    async checkAuth(context) {
      let token = localStorage.getItem("accessToken") || context.state.token; //Токен берем из localStorage
      try {
        return await fetch("https://dist.nd.ru/api/auth", {
          //Делаем запрос для проверки аунтификации
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //Для этого используется токен, который мы получаем при логине
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
        }).catch((Error) => console.log(Error));
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },

    async login(context, loginUser) {
      //Вызывается при логине с существующим логином и паролем
      const status = (res) => {
        if (res.status !== 200) {
          //Если есть ошибки, то возвращаем ошибку
          context.commit("addError", "Пользователь не найден");
          return Promise.reject(new Error(res.statusText));
        }
        return Promise.resolve(res);
      };
      try {
        const data = await fetch("https://dist.nd.ru/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
          body: JSON.stringify({
            email: loginUser.email,
            password: loginUser.password,
          }),
        })
          .then(status)
          .then((res) => res.json())
          .then((data) => data);
        let accessToken = data["accessToken"];
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", loginUser.email);
        context.commit("updateActiveUser", { loginUser, accessToken }); //Вызываем мутацию, чтобы обновить в state активного пользователя
        return status;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    async exitFromAccount(context) {
      await fetch("https://dist.nd.ru/api/auth", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "omit",
        cache: "default",
      });
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      context.state.token = "";
      context.state.activeUser = null;
    },
  },
  getters: {
    activeUser(state) {
      return state.activeUser || localStorage.getItem("user");
    },
    showError(state) {
      return state.errorText;
    },
  },
};
