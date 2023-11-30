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
          v-model.trim="password"
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
        <button class="modal__bottom__btn">Зарегистрироваться</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterDialog",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async submitHandler() {
      console.log("submit");
    },
  },
};
</script>

<style scoped lang="scss"></style>
