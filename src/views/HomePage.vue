<template>
  <div class="notes__dashboard">
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
    <button class="notes__dashboard__add-btn"><AddNoteIcon /></button>
    <NewNoteDialog v-if="isActiveAddNewNote" />
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
    isActiveAddNewNote: true,
  }),
  async mounted() {
    await store.dispatch("getNotes");
  },
};
</script>

<style scoped lang="scss"></style>
