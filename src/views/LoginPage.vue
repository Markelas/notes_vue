<template>
  <main class="promo">
    <section class="promo__text">
      <h1 class="promo__text__title">Мои заметки</h1>
      <h3 class="promo__text__subtitle">
        Не забывай о важном, храни его в облаке.
      </h3>
    </section>
    <img
      src="../assets/images/mainimg.png"
      alt="Hand and notes img"
      class="promo__image"
    />
    <EnterDialog v-if="$store.state.modalActive" />
  </main>
</template>

<script>
import EnterDialog from "@/components/EnterDialog.vue";

export default {
  name: "LoginPage",
  components: { EnterDialog },

  data: () => ({}),
  mounted() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  },
};
</script>

<style scoped lang="scss"></style>
