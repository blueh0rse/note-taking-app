<template>
    <div>
      <DashboardNavbar @create-note="showCreateNoteForm" @show-notes="showNotesList" @logout="logout" />
  
      <div v-if="isCreateNoteVisible" class="create-note-form">
        <h2>Create New Note</h2>
        <form @submit.prevent="createNote">
          <input type="text" v-model="newNoteTitle" placeholder="Note Title" required />
          <textarea v-model="newNoteContent" placeholder="Note Content" required></textarea>
          <button type="submit">Create Note</button>
          <button type="button" @click="cancelCreateNote">Cancel</button>
        </form>
      </div>
  
      <div v-else-if="editingNote" class="edit-note-form">
        <h2>Edit Note</h2>
        <form @submit.prevent="updateNote">
          <input type="text" v-model="editingNote.title" required />
          <textarea v-model="editingNote.content" required></textarea>
          <button type="button" @click="cancelEdit">Cancel</button>
          <button type="submit">Update Note</button>
          <button @click="deleteNote">Delete Note</button>
        </form>
      </div>
  
      <div v-else class="notes-list">
        <div v-for="note in notes" :key="note.id" class="note-item">
          <h3 @click="selectNoteForEdit(note)">{{ note.title }}</h3>
          <!-- Additional note details can be shown here -->
        </div>
      </div>
  
      <p class="message">{{ createNoteMessage }}</p>
    </div>
  </template>
  
  
<script>
import DashboardNavbar from '@/components/DashboardNavbar.vue';
// import apiService from '@/services/apiService.js';
import axios from 'axios';

export default {
    name: 'DashboardPage',
    components: {
        DashboardNavbar,
    },
    data() {
        return {
            //notes: [],
            notes: [
                { id: 1, title: 'Note 1', content: 'Content for note 1' },
                { id: 2, title: 'Note 2', content: 'Content for note 2' },
                // Add as many mock notes as needed for testing
            ],
            newNoteTitle: '',
            newNoteContent: '',
            createNoteMessage: '',
            selectedNote: null,
            isCreateNoteVisible: false,
            editingNote: null,
        };
    },
    mounted() {
        this.fetchNotes(); // Fetch notes when the component is mounted
    },
    methods: {
        async fetchNotes() {
            try {
                const response = await axios.get('/api/notes');
                this.notes = response.data;
                this.createNoteMessage = '';
            } catch (error) {
                this.createNoteMessage = `Failed to fetch notes: ${error.message}`;
            }
        },
        showNotesList() {
            this.isCreateNoteVisible = false;
            this.newNoteTitle = '';
            this.newNoteContent = '';
            this.createNoteMessage = '';
            this.selectedNote = null;
            this.editingNote = null;
        },
        selectNoteForEdit(note) {
            if (note) {
                this.editingNote = JSON.parse(JSON.stringify(note));
            } else {
                // Handle the error, e.g., note not found
                this.createNoteMessage = 'Error: Note not found.';
            }
        },
        showCreateNoteForm() {
            this.isCreateNoteVisible = true;
        },
        hideCreateNoteForm() {
            this.isCreateNoteVisible = false;
        },
        async createNote() {
            this.createNoteMessage = '';
            if (!this.newNoteTitle || !this.newNoteContent) {
                this.createNoteMessage = 'Please fill in all fields.';
                return;
            }

            try {
                const newNote = {
                    id: Date.now(), // Mock ID using the current timestamp
                    title: this.newNoteTitle,
                    content: this.newNoteContent
                };
                this.notes.push(newNote);
                this.newNoteTitle = '';
                this.newNoteContent = '';
                this.createNoteMessage = 'Note created successfully.';
                /*const noteData = {
                    title: this.newNoteTitle,
                    content: this.newNoteContent
                };
                const response = await axios.post('/api/notes', noteData);
                this.notes.push(response.data); // Add new note to notes array
                this.newNoteTitle = '';
                this.newNoteContent = '';
                this.isCreateNoteVisible = false;
                this.createNoteMessage = 'Note created successfully.';*/
            } catch (error) {
                this.createNoteMessage = `Failed to create note: ${error.message}`;
            }
        },
        async updateNote() {
            const index = this.notes.findIndex(note => note.id === this.editingNote.id);
            if (index !== -1) {
                this.notes[index] = { ...this.editingNote };
                this.editingNote = null;
                this.createNoteMessage = 'Note updated successfully.';
            } else {
                this.createNoteMessage = 'Error: Note not found.';
            }
            /*try {
                const response = await axios.put(`/api/notes/${this.editingNote.id}`, this.editingNote);
                const updatedNoteIndex = this.notes.findIndex(note => note.id === this.editingNote.id);
                if (updatedNoteIndex !== -1) {
                    this.notes[updatedNoteIndex] = response.data;
                }
                this.editingNote = null;
                this.createNoteMessage = 'Note updated successfully.';
            } catch (error) {
                this.createNoteMessage = `Failed to update note: ${error.message}`;
            }*/
            this.editingNote = null;
        },
        async deleteNote() {
            if (!confirm('Are you sure you want to delete this note?')) {
                return; // Stop if user cancels
            }
            this.notes = this.notes.filter(note => note.id !== this.editingNote.id);
            this.createNoteMessage = 'Note deleted successfully.';
            this.editingNote = null;
            /*try {
                await axios.delete(`/api/notes/${this.selectedNote.id}`);
                this.notes = this.notes.filter(note => note.id !== this.selectedNote.id);
                this.createNoteMessage = 'Note deleted successfully.';
                this.selectedNote = null; // Reset selected note
            } catch (error) {
                this.createNoteMessage = `Failed to delete note: ${error.message}`;
            }*/
        },
        cancelCreateNote() {
            this.isCreateNoteVisible = false;
            this.newNoteTitle = '';
            this.newNoteContent = '';
            this.createNoteMessage = '';
            this.editingNote = null;
        },
        cancelEdit() {
            this.editingNote = null;
            this.createNoteMessage = '';
        },
        logout() {
            // Clear user session, local storage, or Vuex state as necessary
            // For example, if using Vuex:
            // this.$store.dispatch('logout');

            // Redirect to the login page
            this.$router.push('/home');
        },
    }
}
</script>

<style scoped src="./DashboardStyles.css">
/* This will import styles from DashboardStyles.css */
</style>