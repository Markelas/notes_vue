import axios from "axios";

export default {
  actions: {
    async register(state, newUser) {
      console.log(newUser);
      try {
        fetch("https://dist.nd.ru/api/reg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: newUser.email,
            password: newUser.password,
            confirm_password: newUser.confirm_password,
          }),
        })
          .then((resp) => resp.text())
          .then(console.log);
      } catch (e) {
        console.log(e);
      }
    },
    async checkAuth() {
      try {
        await axios
          .get("https://dist.nd.ru/api/reg")
          .then((response) => console.log(response));
      } catch (e) {
        console.log(e);
      }
    },
    async login(state, loginUser) {
      try {
        fetch("https://dist.nd.ru/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginUser.email,
            password: loginUser.password,
          }),
        })
          .then((resp) => resp.text())
          .then(console.log);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
