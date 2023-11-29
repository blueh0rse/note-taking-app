<template>
  <router-view />
</template>

<script>
//import AppNavbar from './AppNavbar.vue';
//import NoteList from './components/NoteList.vue';
//import NoteEditor from './components/NoteEditor.vue';
// import LoginForm from './components/LoginForm.vue';
// import RegisterPage from './components/RegisterPage.vue';
// import HomePage from './components/Home.vue';
export default {
  name: 'App',
  components: {
    //AppNavbar,
    //NoteList,
    //NoteEditor,
    // RegisterPage,
    // LoginForm,
    // HomePage
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
#noteApp {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>

