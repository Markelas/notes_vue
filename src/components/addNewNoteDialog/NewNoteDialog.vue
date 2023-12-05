<template>
  <dialog class="modal">
    <div class="modal__wrapper">
      <button class="modal__close-btn" @click="toggleBackgroundModalWindow">
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
              placeholder="Введите название"
            />
            <div class="input__bottom">
              <span class="input__error" v-if="titleError"
                >Поле не должно быть пустым</span
              >
              <span class="input__length">{{
                `${noteTitle.length} / 100`
              }}</span>
            </div>
            <label for="noteContent">Текст заметки</label>
            <textarea
              v-model="noteContent"
              maxlength="200"
              rows="7"
              cols="3"
              placeholder="Введите текст"
            />
            <div class="input__bottom">
              <span class="input__error" v-if="contentError"
                >Поле не должно быть пустым</span
              >
              <span class="input__length">{{
                `${noteContent.length} / 200`
              }}</span>
            </div>
          </div>
          <div class="modal__bottom">
            <button class="modal__bottom__btn" type="submit">Добавить</button>
          </div>
        </div>
      </form>
    </div>
  </dialog>
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
    titleError: null,
    contentError: null,
  }),
  methods: {
    async submitHandler() {
      if (this.noteContent.length === 0) {
        this.contentError = true;
      }
      if (this.noteTitle.length === 0) {
        this.titleError = true;
      }
      if (this.noteContent.length !== 0 && this.noteTitle.length !== 0) {
        const noteInfo = {
          title: this.noteTitle,
          content: this.noteContent,
        };
        await store.dispatch("addNote", noteInfo);
        this.toggleBackgroundModalWindow();
        this.$emit("add", noteInfo);
      }
    },

    toggleBackgroundModalWindow() {
      store.commit("toggleBackgroundModalWindow");
    },
  },
};
</script>

<style scoped lang="scss">
.modal__bottom {
  justify-content: flex-end;
}
</style>
