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
import apiService from '@/services/apiService.js';

export default {
    name: 'NoteEditorPage',
    data() {
    return {
      noteContent: ''
    };
  },
  methods: {
    saveNote() {
      apiService.saveNote(this.noteContent)
        .then(response => {
          // Handle successful save
        })
        .catch(error => {
          // Handle errors
        });
    },
    loadNote() {
      // Method to load a note's content from the backend
    }
  },
  mounted() {
    this.loadNote();
  }
}
</script>
  
<style scoped src="./NoteEditorStyles.css">
/* CSS specific to NoteEditorPage */
</style>
  