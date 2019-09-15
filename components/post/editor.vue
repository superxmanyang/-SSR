<template>

</template>

<script>
import "quill/dist/quill.snow.css";
export default {
  mounted() {
    let VueEditor;

    if (process.browser) {
      VueEditor = require("vue-word-editor").default;
    }
  }
};
</script>

<style>
</style>