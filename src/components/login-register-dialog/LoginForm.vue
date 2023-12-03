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
          required
          placeholder="Введите значение"
        />
        <label for="email">Пароль</label>
        <input
          id="password"
          v-model.trim="password"
          :type="showPass ? 'text' : 'password'"
          autocomplete="on"
          required
          placeholder="Введите значение"
        />
        <button @click="toggleShowPass" type="button">
          <EyeIconForPassword />
        </button>
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

export default {
  name: "LoginDialog",
  components: { EyeIconForPassword },
  data: () => ({
    email: "",
    password: "",
    haveErrors: false,
    showPass: false,
  }),
  methods: {
    async submitHandler() {
      //Заходим
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
