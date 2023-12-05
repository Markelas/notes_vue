<template>
  <main>
    <OneNote :notes-list="notesList" @delete="deleteNote" />

    <button class="notes__dashboard__add-btn" @click="openNewNoteWindow">
      <AddNoteIcon />
    </button>
    <NewNoteDialog v-if="$store.state.modalActive" @add="addNoteOnDashboard" />
    <div class="overlay" v-if="$store.state.modalActive" />
  </main>
</template>

<script>
import OneNote from "@/components/OneNote.vue";
import AddNoteIcon from "@/components/icons/AddNoteIcon.vue";
import store from "@/store";
import NewNoteDialog from "@/components/addNewNoteDialog/NewNoteDialog.vue";

export default {
  name: "HomePage",
  components: { NewNoteDialog, AddNoteIcon, OneNote },
  data: () => ({
    modalActive: true,
    notesList: [], //Массив с заметками
  }),
  async mounted() {
    await this.getNotesList(); //При загрузке страницы проверяем список заметок
  },
  methods: {
    openNewNoteWindow() {
      store.commit("toggleBackgroundModalWindow");
    },
    async getNotesList() {
      this.notesList = await store.dispatch("getNotes"); //Получаем с базы данных информацию о заметках
    },
    addNoteOnDashboard(noteInfo) {
      noteInfo.id = Date.now(); //Добавляем временный id
      this.notesList.push(noteInfo); //Пушим в конец массива
    },
    async deleteNote(note) {
      let index = this.notesList.indexOf(note); //Получаем id заметки, которую хотим удалить
      if (index !== -1) this.notesList.splice(index, 1); //Удаляем ее
      await store.dispatch("deleteNote", note); //Также удаляем ее на сервере
    },
  },
};
</script>

<style scoped lang="scss"></style>
