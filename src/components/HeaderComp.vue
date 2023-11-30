<template>
  <div class="header__container">
    <MainLogo />
    <div>
      <button class="header__btn">
        <EnterIcon class="header__btn__icon" /> Вход
      </button>
    </div>
  </div>
</template>

<script setup>
import MainLogo from "@/components/icons/MainLogo.vue";
import EnterIcon from "@/components/icons/EnterIcon.vue";
</script>

<style scoped lang="scss"></style>
