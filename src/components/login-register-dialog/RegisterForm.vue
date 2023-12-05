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
        <p class="input__error" v-if="invalidEmail">{{ invalidEmail }}</p>
        <label for="email">Пароль</label>
        <input
          id="password"
          v-model="password"
          :type="showPass ? 'text' : 'password'"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <button @click="toggleShowPass" type="button">
          <EyeIconForPassword v-if="!showPass" />
          <ClosedEye v-else />
        </button>
        <p class="input__error" v-if="invalidPassword">{{ invalidPassword }}</p>
        <label for="email">Пароль еще раз</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          :type="showConfirmPass ? 'text' : 'password'"
          autocomplete="on"
          placeholder="Введите значение"
        />
        <button @click="toggleShowConfirmPass" type="button">
          <EyeIconForPassword v-if="!showConfirmPass" />
          <ClosedEye v-else />
        </button>
        <p class="input__error" v-if="invalidPassword">{{ invalidPassword }}</p>
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
      <div class="modal__success" v-if="successRegister">
        <span>Регистрация прошла успешно! Теперь Вы можете войти!</span>
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";
import EyeIconForPassword from "@/components/icons/EyeIconForPassword.vue";
import ClosedEye from "@/components/icons/ClosedEye.vue";

export default {
  name: "RegisterDialog",
  components: { ClosedEye, EyeIconForPassword },
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    successRegister: false, //Для вывода, что регистрация прошла успешно
    showPass: false, //Скрыть или показать пароль
    showConfirmPass: false,
    invalidPassword: null,
    invalidEmail: null,
  }),
  methods: {
    async submitHandler() {
      //Проверка пароля
      if (this.password.length === 0) {
        this.invalidPassword = "Пароль не может быть пустым";
      } else if (this.password.length < 4) {
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

      // Регистрируемся
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
          this.invalidEmail = null;
          this.email = ""; //Очищаем
          this.password = "";
          this.confirmPassword = "";
        } else if (
          store.getters.showError ===
          "Пользователь с таким e-mail уже зарегистрирован"
        ) {
          this.invalidEmail = "Пользователь с таким e-mail уже зарегистрирован";
        }
      } else {
        this.invalidPassword = "Пароли не совпадают";
      }
    },
    toggleShowPass() {
      this.showPass = !this.showPass; //При нажатии на иконку глаза в пароле, отображаем или скрываем пароль
    },
    toggleShowConfirmPass() {
      this.showConfirmPass = !this.showConfirmPass; //При нажатии на иконку глаза в пароле, отображаем или скрываем пароль
    },
  },
};
</script>

<style scoped lang="scss"></style>
