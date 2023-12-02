<template>
  <form @submit.prevent="submitHandler">
    <div class="modal__body">
      <h2 class="modal__body__title">Регистрация</h2>
      <div class="modal__body__inputs">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="email"
          type="text"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <label for="email">Пароль</label>
        <input
          id="password"
          v-model.trim="password"
          type="text"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <label for="email">Пароль еще раз</label>
        <input
          id="password"
          v-model.trim="confirmPassword"
          type="text"
          autocomplete="on"
          placeholder="Введите значение"
        />
      </div>
      <div class="modal__bottom">
        <span
          >У вас есть аккаунт?
          <span class="bottom__signup-btn" @click="$emit('change')"
            >Войдите</span
          ></span
        >
        <button class="modal__bottom__btn" type="submit">
          Зарегистрироваться
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";

export default {
  name: "RegisterDialog",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  methods: {
    async submitHandler() {
      // Регистрируемся и логинимся
      console.log(this.email, this.password, this.confirmPassword);
      if (this.password === this.confirmPassword) {
        //Если пароли совпадают
        const newUser = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        };
        let registerReq = await this.$store.dispatch("register", newUser); //Делаем запрос на сервер
        registerReq = JSON.parse(registerReq); //Парсим ответ
        if (!("statusCode" in registerReq)) {
          //Если есть ошибка, то остаетмся, если нет, то переходим
          await store.commit("toggleBackgroundModalWindow");
          await this.$router.push("/");
        }
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
