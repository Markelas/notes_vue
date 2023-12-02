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
            <label for="noteTitle">Название заметки</label>
            <input
              id="noteTitle"
              v-model="noteTitle"
              maxlength="100"
              type="text"
              required
              placeholder="Введите название"
            />
            <span class="input__length">{{ `${noteTitle.length} / 100` }}</span>
            <label for="noteContent">Текст заметки</label>
            <textarea
              v-model="noteContent"
              maxlength="500"
              rows="7"
              cols="3"
              required
              placeholder="Введите текст"
            />
            <span class="input__length">{{
              `${noteContent.length} / 500`
            }}</span>
          </div>
          <div class="modal__bottom">
            <button class="modal__bottom__btn" type="submit">Добавить</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CrossBtnIcon from "@/components/icons/CrossBtnIcon.vue";
import store from "@/store";

export default {
  name: "NewNoteDialog",
  components: { CrossBtnIcon },
  data: () => ({
    noteTitle: "",
    noteContent: "",
  }),
  methods: {
    async submitHandler() {
      const noteInfo = {
        title: this.noteTitle,
        content: this.noteContent,
      };
      await store.dispatch("addNote", noteInfo);
    },
  },
};
</script>

<style scoped lang="scss">
.modal__bottom {
  justify-content: flex-end;
}
</style>
