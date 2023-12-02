export default {
  state: {},
  actions: {
    async getNotes(context) {
      let token = localStorage.getItem("accessToken") || context.state.token;
      try {
        const data = await fetch("https://dist.nd.ru/api/notes", {
          //Делаем запрос для проверки аунтификации
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //Передаем токен для проверки авторизации
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
        })
          .then((res) => res.json())
          .then((data) => data)
          .catch((Error) => console.log(Error));
        context.state.noteList = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async addNote(context, noteInfo) {
      let token = localStorage.getItem("accessToken") || context.state.token;
      try {
        await fetch("https://dist.nd.ru/api/notes", {
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
    async deleteNote(context, note) {
      let token = localStorage.getItem("accessToken") || context.state.token;
      console.log(note);
      try {
        await fetch(`https://dist.nd.ru/api/notes/${note.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //Передаем токен для проверки авторизации
          },
          mode: "cors",
          credentials: "omit",
          cache: "default",
        });
      } catch (e) {
        context.commit("setError", e);
        throw e;
      }
    },
  },
};
