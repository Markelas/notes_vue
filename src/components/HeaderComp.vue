<template>
  <header class="header__container">
    <MainLogo />
    <div>
      <button
        v-if="$store.getters.activeUser"
        class="header__user-btn"
        @click="toggleExitBtn"
      >
        <span>{{ $store.getters.activeUser }}</span> <ProfileIcon />
      </button>
      <button class="header__btn" @click="toggleWindow" v-else>
        <EnterIcon class="header__btn__icon" /> Вход
      </button>
      <ExitButton v-if="isOpenExitBtn" @exit="hideBtn" />
    </div>
  </header>
</template>

<script>
import MainLogo from "@/components/icons/MainLogo.vue";
import EnterIcon from "@/components/icons/EnterIcon.vue";
import { defineComponent } from "vue";
import store from "@/store";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import ExitButton from "@/components/ExitButton.vue";

export default defineComponent({
  components: { ExitButton, ProfileIcon, EnterIcon, MainLogo },
  data: () => ({
    isOpenExitBtn: false,
  }),
  methods: {
    toggleWindow() {
      store.commit("toggleBackgroundModalWindow");
    },
    toggleExitBtn() {
      this.isOpenExitBtn = !this.isOpenExitBtn;
    },
    hideBtn() {
      this.isOpenExitBtn = !this.isOpenExitBtn;
    },
  },
  computed: {},
  async mounted() {
    await store.dispatch("checkAuth");
  },
});
</script>

<style scoped lang="scss"></style>
