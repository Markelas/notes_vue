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
        <span>Регистрация прошла успешно! Теперь Вы можете войти!</span>
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
    successRegister: false, //Для вывода, что регистрация прошла успешно
    showPass: false, //Скрыть или показать пароль
  }),
  methods: {
    async submitHandler() {
      // Регистрируемся и логинимся
      if (this.password === this.confirmPassword) {
        //Если пароли совпадают
        const newUser = {
          email: this.email, //Передаем данные в функцию register
          password: this.password,
          confirm_password: this.confirmPassword,
        };
        const registerReq = await this.$store.dispatch("register", newUser); //Делаем запрос на сервер
        //Если регистрация прошла успешно
        if (registerReq.ok) {
          this.successRegister = !this.successRegister; //Отображаем информацию об этом в модальном окне
          this.email = ""; //Очищаем
          this.password = "";
          this.confirmPassword = "";
        }
      } else {
        await store.commit("addError", "Пароли не совпадают"); //Выводим ошибку
      }
    },
    toggleShowPass() {
      this.showPass = !this.showPass; //При нажатии на иконку глаза в пароле, отображаем или скрываем пароль
    },
  },
  computed: {
    showError() {
      return store.getters.showError; //Получаем ошибку, если есть, то выводим
    },
  },
};
</script>

<style scoped lang="scss"></style>
