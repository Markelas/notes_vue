<template>
  <div class="header__container">
    <MainLogo />
    <div>
      <button v-if="this.$store.state.activeUser">
        {{ this.$store.state.activeUser }}
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

export default defineComponent({
  components: { EnterIcon, MainLogo },
  methods: {
    toggleWindow() {
      store.commit("toggleLoginWindow");
    },
  },
  computed: {
    activeUser() {
      console.log(this.$store.state.activeUser);
      return this.$store.state.activeUser;
    },
  },
  getters: {
    error: (s) => s.error,
  },
  mounted() {
    store.dispatch("checkAuth");
  },
});
</script>

<style scoped lang="scss"></style>
