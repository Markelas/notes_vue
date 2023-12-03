<template>
  <div class="main-layout__wrapper" role="main">
    <HeaderComp />

    <router-view />
    {{ error }}
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "main-layout",
  components: { HeaderComp },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(baseError) {
      console.log("baseError", baseError);
    },
  },
};
</script>

<style scoped lang="scss"></style>
