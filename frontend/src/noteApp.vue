<template>
  <div id="app">
    <AppNavbar 
      @show-registration="showRegistrationForm = true; showLoginForm = false; closeForms()"
      @show-login="showLoginForm = true; showRegistrationForm = false; closeForms()"
      @toggle-create-note="toggleCreateNoteForm"
      @show-delete-account="toggleDeleteAccountForm"
      :is-logged-in="isLoggedIn"
      :is-signing-up="showRegistrationForm"
    />
    <LoginForm v-if="showLoginForm && !isLoggedIn" @login-success="handleLoginSuccess" />
    <RegistrationForm v-if="showRegistrationForm && !isLoggedIn" @register-success="handleRegisterSuccess" />
    <div v-if="isLoggedIn" class="container">
      <CreateNote v-if="showCreateNoteForm" @saveNote="addNote" />
      <DeleteAccount v-if="showDeleteAccountForm" />
      <NoteList :notes="notes" @selectNote="selectNote" @note-deleted="removeNote" />
      <NoteEditor v-if="selectedNote" :selectedNote="selectedNote" @saveNote="saveNote" />
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import AppNavbar from './AppNavbar.vue';
import NoteList from './NoteList.vue';
import NoteEditor from './NoteEditor.vue';
import LoginForm from "./LoginForm.vue";
import RegistrationForm from './RegistrationForm.vue';
import DeleteAccount from './DeleteAccount.vue'; 
import CreateNote from './CreateNote.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    NoteList,
    NoteEditor,
    LoginForm,
    RegistrationForm,
    DeleteAccount,
    CreateNote,
  },
  data() {
    return {
      notes: [],
      selectedNote: null,
      showLoginForm: true,
      showRegistrationForm: false,
      showCreateNoteForm: false,
      showDeleteAccountForm: false,
      isLoggedIn: false,
    };
  },
  created() {
    if (this.isLoggedIn) {
      this.fetchNotes();
    }
  },
  methods: {
    selectNote(note) {
      this.selectedNote = note;
    },
    saveNote(updatedNote) {
      if (updatedNote.id) {
        // Make an API call to update the existing note
        axios.put(`http://localhost:3000/notes/${updatedNote.id}`, updatedNote)
          .then(response => {
            // Update the note in the local array with the response data
            this.notes = this.notes.map(note =>
              note.id === updatedNote.id ? response.data : note
            );
          })
          .catch(error => console.error('Error updating note:', error));
      }

      this.selectedNote = null; // Clear the selected note after saving
    },

    addNote(newNote) {
      // Make an API call to add the new note
      axios.post('http://localhost:3000/notes', newNote)
        .then(response => {
          // Add the new note (with ID from the response) to the local array
          this.notes.push(response.data);
        })
        .catch(error => console.error('Error adding note:', error));

      this.selectedNote = null; // Clear the selected note
    },
    fetchNotes() {
      axios.get('http://localhost:3000/notes')
        .then(response => {
          this.notes = response.data;
        })
        .catch(error => console.error('Error fetching notes:', error));
    },
    toggleDeleteAccountForm() {
      this.showDeleteAccountForm = !this.showDeleteAccountForm;
      if (this.showDeleteAccountForm) {
        this.showCreateNoteForm = false;
      }
    },
    toggleCreateNoteForm() {
      this.showCreateNoteForm = !this.showCreateNoteForm;
      if (this.showCreateNoteForm) {
        this.showDeleteAccountForm = false;
      }
    },
    removeNote(noteId) {
      this.notes = this.notes.filter(note => note.id !== noteId);
    },
    handleLoginSuccess() {
      this.isLoggedIn = true;
      this.showLoginForm = false;
      this.fetchNotes();
    },
    handleRegisterSuccess() {
      // Handle registration success (e.g., showing login form)
      this.showLoginForm = true;
      this.showRegistrationForm = false;
    },
    closeForms() {
      this.showCreateNoteForm = false;
      this.showDeleteAccountForm = false;
    },
  },
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  color: #212121;
  background-color: #F5F5F5;
  margin: 0;
  padding: 0;
}

a, button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
}

a:hover, button:hover {
  background-color: #388E3C;
}

.navbar {
  background-color: #333;
  color: white;
  /* Other navbar styles */
}
/* Aggiungi qui gli stili CSS */
#noteApp {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>

