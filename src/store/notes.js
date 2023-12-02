export default {
  state: {},
  actions: {
    async getNotes(context) {
      let token = localStorage.getItem("accessToken") || context.state.token;
      try {
        return await fetch("https://dist.nd.ru/api/notes", {
          //Делаем запрос для проверки аунтификации
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //Передаем токен для проверки авторизации
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
        }).catch((Error) => console.log(Error));
      } catch (e) {
        console.log(e);
      }
    },
    async addNote(context, noteInfo) {
      let token = localStorage.getItem("accessToken") || context.state.token;
      try {
        return await fetch("https://dist.nd.ru/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //Передаем токен для проверки авторизации
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
          body: JSON.stringify({
            title: noteInfo.title,
            content: noteInfo.content,
          }),
        });
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
};
