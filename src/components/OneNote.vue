<template>
  <section class="notes__dashboard">
    <article class="note" v-for="note in notesList" :key="note.id">
      <h4 class="note__title">{{ note.title }}</h4>
      <p class="note__text">
        {{ note.content }}
      </p>
      <div class="note__box">
        <button class="note__box__delete" @click="$emit('delete', note)">
          <cross-btn-icon /> Удалить
        </button>
      </div>
    </article>
  </section>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";

export default {
  name: "OneNote",
  components: { CrossBtnIcon },
  props: ["notesList"], //Получаем список заметок
};
</script>

<style scoped lang="scss"></style>
