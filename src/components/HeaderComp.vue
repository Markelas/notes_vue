<template>
  <div class="header__container">
    <MainLogo />
    <div>
      <button v-if="activeUser" class="header__user-btn">
        {{ activeUser }} <ProfileIcon />
      </button>
      <button class="header__btn" @click="toggleWindow" v-else>
        <EnterIcon class="header__btn__icon" /> Вход
      </button>
    </div>
    <div class="overlay" v-if="$store.state.modalActive" />
  </div>
</template>

<script>
import MainLogo from "@/components/icons/MainLogo.vue";
import EnterIcon from "@/components/icons/EnterIcon.vue";
import { defineComponent } from "vue";
import store from "@/store";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";

export default defineComponent({
  components: { ProfileIcon, EnterIcon, MainLogo },
  methods: {
    toggleWindow() {
      store.commit("toggleLoginWindow");
    },
  },
  computed: {
    activeUser() {
      return localStorage.getItem("user");
    },
  },
  getters: {
    error: (s) => s.error,
  },
  async mounted() {
    await store.dispatch("checkAuth");
  },
});
</script>

<style scoped lang="scss"></style>
