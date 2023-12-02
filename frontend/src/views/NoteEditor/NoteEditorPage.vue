<template>
    <div class="note-editor">
      <vue-quill-editor v-model="noteContent"></vue-quill-editor>
      <button @click="saveNote">Save Note</button>
    </div>
  </template>  
  
<script>
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
    name: 'NoteEditorPage',
    data() {
    return {
      noteContent: ''
    };
  },
  methods: {
    saveNote() {
      // Logic to save the note content
    }
  }
}
</script>
  
<style scoped src="./NoteEditorStyles.css">
/* CSS specific to NoteEditorPage */
</style>
  