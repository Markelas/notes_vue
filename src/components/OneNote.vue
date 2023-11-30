<template>
  <div class="note">
    <h4 class="note__title">Заголовок</h4>
    <p class="note__text">
      А также явные признаки победы институционализации могут быть объединены в
      целые кластеры себе подобных.
    </p>
    <button class="note__delete"><cross-btn-icon /> Удалить</button>
  </div>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";

export default {
  name: "OneNote",
  components: { CrossBtnIcon },
};
</script>

<style scoped lang="scss"></style>
