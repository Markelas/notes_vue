<template>
  <div class="header__container">
    <MainLogo />
    <div>
      <button class="header__btn" @click="toggleWindow">
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
});
</script>

<style scoped lang="scss"></style>
