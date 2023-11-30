<template>
  <div class="notes__dashboard">
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
    <OneNote />
  </div>
</template>

<script>
import OneNote from "@/components/OneNote.vue";

export default {
  name: "HomePage",
  components: { OneNote },
};
</script>

<style scoped lang="scss"></style>
