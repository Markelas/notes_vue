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
          :type="showPass ? 'text' : 'password'"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <button @click="toggleShowPass" type="button">
          <EyeIconForPassword />
        </button>
        <label for="email">Пароль еще раз</label>
        <input
          id="confirmPassword"
          v-model.trim="confirmPassword"
          :type="showPass ? 'text' : 'password'"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <button @click="toggleShowPass" type="button">
          <EyeIconForPassword />
        </button>
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
      <div class="modal__error" v-if="showError">
        <span>{{ showError }}</span>
      </div>
      <div class="modal__success" v-if="successRegister">
        <span>Регистрация прошла успешно, теперь, вы можете войти</span>
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";
import EyeIconForPassword from "@/components/icons/EyeIconForPassword.vue";

export default {
  name: "RegisterDialog",
  components: { EyeIconForPassword },
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    successRegister: false,
    showPass: false,
  }),
  methods: {
    async submitHandler() {
      // Регистрируемся и логинимся
      if (this.password === this.confirmPassword) {
        //Если пароли совпадают
        const newUser = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword,
        };
        const registerReq = await this.$store.dispatch("register", newUser); //Делаем запрос на сервер
        if (registerReq.ok) {
          this.successRegister = !this.successRegister;
          this.email = "";
          this.password = "";
          this.confirmPassword = "";
        }
      } else {
        await store.commit("addError", "Пароли не совпадают");
      }
    },
    toggleShowPass() {
      this.showPass = !this.showPass;
    },
  },
  computed: {
    showError() {
      return store.getters.showError;
    },
  },
};
</script>

<style scoped lang="scss"></style>
