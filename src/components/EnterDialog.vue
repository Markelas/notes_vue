<template>
  <dialog class="modal">
    <div class="modal__wrapper">
      <button class="modal__close-btn" @click="toggleWindow">
        <CrossBtnIcon />
      </button>
      <LoginDialog v-if="isLogin" @change="openAnotherForm" />
      <RegisterDialog v-else @change="openAnotherForm" />
    </div>
  </dialog>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";
import LoginDialog from "@/components/login-register-dialog/LoginForm.vue";
import RegisterDialog from "@/components/login-register-dialog/RegisterForm.vue";
import store from "@/store";

export default {
  name: "EnterDialog",
  components: { RegisterDialog, CrossBtnIcon, LoginDialog },
  data: () => ({
    isLogin: true, //Отображение в окне формы логина или регистрации
  }),
  methods: {
    toggleWindow() {
      if (store.state.modalActive) {
        //Очистка модального окна от ошибок
        store.commit("addError", null);
      }
      store.commit("toggleBackgroundModalWindow"); //Убираем или отображаем модальное окно
    },
    openAnotherForm() {
      this.isLogin = !this.isLogin; //Переключение окна регистрации и входа
    },
  },
};
</script>

<style scoped lang="scss"></style>
