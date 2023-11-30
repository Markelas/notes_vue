<template>
  <div id="app">
    <component :is="MainLayout">
      <router-view />
    </component>
  </div>
</template>

<style lang="scss"></style>
<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
</script>
