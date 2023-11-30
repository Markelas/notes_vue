<template>
  <form @submit.prevent="submitHandler">
    <div class="modal__body">
      <h2 class="modal__body__title">Вход в ваш аккаунт</h2>
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
      </div>
      <div class="modal__bottom">
        <span
          >У вас нет аккаунта?
          <span class="bottom__signup-btn" @click="$emit('change')">
            Зарегистрируйтесь
          </span>
        </span>
        <button class="modal__bottom__btn" type="submit">Войти</button>
      </div>
      <div class="modal__error" v-if="haveErrors">
        <span>Пользователь с таким логином не найден</span>
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";

export default {
  name: "LoginDialog",
  data: () => ({
    email: "",
    password: "",
    haveErrors: false,
  }),
  methods: {
    async submitHandler() {
      const loginUser = {
        email: this.email,
        password: this.password,
      };
      console.log(loginUser);
      await store.dispatch("login", loginUser);
    },
  },
};
</script>

<style scoped lang="scss"></style>
