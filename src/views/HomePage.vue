<template>
  <div class="notes__dashboard">
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
    <button class="notes__dashboard__add-btn"><AddNoteIcon /></button>
  </div>
</template>

<script>
import OneNote from "@/components/OneNote.vue";
import AddNoteIcon from "@/components/icons/AddNoteIcon.vue";
import store from "@/store";

export default {
  name: "HomePage",
  components: { AddNoteIcon, OneNote },
  async mounted() {
    await store.dispatch("getNotes");
  },
};
</script>

<style scoped lang="scss"></style>
