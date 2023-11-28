<template>
  <div id="app">
    <AppNavbar />
    <div class="container">
      <NoteList :notes="notes" @selectNote="selectNote" />
      <NoteEditor :selectedNote="selectedNote" @saveNote="saveNote" />
    </div>
  </div>
</template>

<script>
import AppNavbar from './AppNavbar.vue';
import NoteList from './NoteList.vue';
import NoteEditor from './NoteEditor.vue';

export default {
  name: 'NoteApp',
  components: {
    AppNavbar,
    NoteList,
    NoteEditor
  },
  data() {
    return {
      notes: [],
      selectedNote: null
    };
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note;
    },
    saveNote(newNote) {
      // Qui puoi aggiungere la logica per salvare la nota
      // Ad esempio, aggiungere una nuova nota o aggiornare una esistente
      console.log('Nota salvata:', newNote);
    }
  },
  // Qui puoi aggiungere altre opzioni come created o mounted per caricare le note iniziali
};
</script>

<style>
/* Aggiungi qui gli stili CSS */
.container {
  display: flex;
  justify-content: space-between;
}
</style>

