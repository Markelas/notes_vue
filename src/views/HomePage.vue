<template>
  <div>
    <OneNote :notes-list="notesList" @delete="deleteNote" />

    <button class="notes__dashboard__add-btn" @click="openNewNoteWindow">
      <AddNoteIcon />
    </button>
    <NewNoteDialog v-if="$store.state.modalActive" @add="addNoteOnDashboard" />
    <div class="overlay" v-if="$store.state.modalActive" />
  </div>
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
    notesList: [],
  }),
  async mounted() {
    await this.getNotesList();
  },
  methods: {
    openNewNoteWindow() {
      store.commit("toggleBackgroundModalWindow");
    },
    async getNotesList() {
      this.notesList = await store.dispatch("getNotes");
    },
    addNoteOnDashboard(noteInfo) {
      noteInfo.id = Date.now(); //Добавляем временный id
      this.notesList.push(noteInfo); //Пушим в конец массива
    },
    async deleteNote(note) {
      await store.dispatch("deleteNote", note);
    },
  },
};
</script>

<style scoped lang="scss"></style>
