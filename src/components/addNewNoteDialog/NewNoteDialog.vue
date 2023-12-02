<template>
  <div class="modal">
    <div class="modal__wrapper">
      <button class="modal__close-btn">
        <CrossBtnIcon />
      </button>
      <form @submit.prevent="submitHandler">
        <div class="modal__body">
          <h2 class="modal__body__title">Добавление заметки</h2>
          <div class="modal__body__inputs">
            <label for="email">Email</label>
            <input
              id="email"
              v-model.trim="noteTitle"
              type="text"
              autocomplete="on"
              placeholder="Введите значение"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";

export default {
  name: "NewNoteDialog",
  components: { CrossBtnIcon },
  data: () => ({
    noteTitle: "",
  }),
  methods: {
    async submitHandler() {},
  },
};
</script>

<style scoped lang="scss"></style>
