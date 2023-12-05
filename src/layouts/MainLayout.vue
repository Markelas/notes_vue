<template>
  <main class="main-layout__wrapper">
    <HeaderComp />

    <router-view />
  </main>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "main-layout",
  components: { HeaderComp },
};
</script>

<style scoped lang="scss"></style>
