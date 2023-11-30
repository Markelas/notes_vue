<template>
  <div class="modal">
    <div class="modal__wrapper">
      <button class="modal__close-btn" @click="toggleWindow">
        <CrossBtnIcon />
      </button>
      <LoginDialog v-if="isLogin" />
      <RegisterDialog v-else />
    </div>
  </div>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";
import LoginDialog from "@/components/login-register-dialog/LoginDialog.vue";
import RegisterDialog from "@/components/login-register-dialog/RegisterDialog.vue";
import store from "@/store";

export default {
  name: "EnterDialog",
  components: { RegisterDialog, CrossBtnIcon, LoginDialog },
  data: () => ({
    isLogin: true, //Отображение в окне формы логина или регистрации
  }),
  methods: {
    toggleWindow() {
      store.commit("toggleLoginWindow");
    },
  },
};
</script>

<style scoped lang="scss"></style>
