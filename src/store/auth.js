import axios from "axios";

export default {
  actions: {
    async register(newUser) {
      try {
        await axios
          .post("https://dist.nd.ru/api/reg", newUser)
          .then((response) => console.log(response));
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
  },
};
