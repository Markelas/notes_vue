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
        <p class="input__error" v-if="invalidEmail">{{ invalidEmail }}</p>
        <label for="email">Пароль</label>
        <input
          id="password"
          v-model.trim="password"
          :type="showPass ? 'text' : 'password'"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <button @click="toggleShowPass" type="button">
          <EyeIconForPassword v-if="!showPass" />
          <ClosedEye v-else />
        </button>
        <p class="input__error" v-if="invalidPassword">{{ invalidPassword }}</p>
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
      <div class="modal__error" v-if="showError">
        <span>{{ showError }}</span>
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";
import EyeIconForPassword from "@/components/icons/EyeIconForPassword.vue";
import ClosedEye from "@/components/icons/ClosedEye.vue";

export default {
  name: "LoginDialog",
  components: { ClosedEye, EyeIconForPassword },
  data: () => ({
    email: "",
    password: "",
    haveErrors: false,
    showPass: false,
    invalidPassword: null,
    invalidEmail: null,
  }),
  methods: {
    async submitHandler() {
      //Проверка пароля
      if (this.password.length === 0) {
        this.invalidPassword = "Пароль не может быть пустым";
      } else if (this.password.length < 3) {
        this.invalidPassword = "Пароль не может быть короче 4 символов";
      } else {
        this.invalidPassword = null;
      }

      //Проверка email
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      if (this.email.length === 0) {
        this.invalidEmail = "E-Mail не может быть пустым";
      } else if (!EMAIL_REGEXP.test(this.email)) {
        this.invalidEmail = "Невалидный адрес электронной почты";
      } else {
        this.invalidEmail = null;
      }

      //Заходим
      if (
        this.email.length !== 0 &&
        this.password.length !== 0 &&
        !this.invalidEmail
      ) {
        const loginUser = {
          email: this.email,
          password: this.password,
        };
        try {
          await store.dispatch("login", loginUser); //Делаем запрос
          //Если в ответе все хорошо, то переходим
          await store.commit("toggleBackgroundModalWindow"); //Убираем модальное окно
          await this.$router.push("/"); //Переходим на главную страницу с заметками
          await store.dispatch("checkAuth"); //Проверяем аунтификацию
        } catch (e) {
          console.log(e);
        }
      }
    },
    toggleShowPass() {
      this.showPass = !this.showPass; // Отображать или скрыть пароль
    },
  },
  computed: {
    showError() {
      return store.getters.showError; // Отображение ошибок
    },
  },
};
</script>

<style scoped lang="scss"></style>
