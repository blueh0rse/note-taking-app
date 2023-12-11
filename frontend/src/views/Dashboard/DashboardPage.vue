<template>
    <div>
        <DashboardNavbar @create-note="showCreateNoteForm" @show-notes="showNotesList" @logout="logout" />
        <div v-if="isCreateNoteVisible" class="create-note-form">
            <h2>Create New Note</h2>
            <form @submit.prevent="createNote">
                <input type="text" v-model="newNoteTitle" placeholder="Note name" required />
                <button type="submit" class="custom-button">Create Note</button>
                <button type="button" @click="cancelCreateNote" class="custom-button cancel-button">Cancel</button>
            </form>
        </div>
        <div v-else-if="editingNote" class="edit-note-form">
            <h2>Edit Note</h2>
            <form>
                <input type="text" v-model="editingNote.title" required />
                <textarea v-model="editingNote.content"></textarea>
                <button type="button" @click="cancelEdit" class="custom-button cancel-button">Cancel</button>
                <button @click="updateNote" type="submit" class="custom-button update-button">Update Note</button>
                <button @click="deleteNote" type="button" class="custom-button delete-button">Delete Note</button>
            </form>
        </div>

        <div v-else class="notes-list">
            <div v-for="note in notes" :key="note.id" class="note-item">
                <h3 @click="selectNoteForEdit(note)">{{ note.name }}</h3>
                <!-- Additional note details can be shown here -->
            </div>
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
import store from "../../store/index";
import authService from '@/services/authService';
const API = store.state.API_URL;
export default {
  name: 'DashboardPage',
  components: {
    DashboardNavbar,
  },
  data() {
    return {
      //notes: [],
      notes: [
        { id: 1, title: 'Note Example', content: 'Content for note 1' },
        // Add as many mock notes as needed for testing
      ],
      newNoteTitle: '',
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
        this.createNoteMessage = 'Fetching notes...';
        const response = await authService.fetch_notes();
        // Check if the response status code indicates success (e.g., 200)
        if (response.status === 200) {
          // Update your notes data here
          this.notes = response.data;
          this.createNoteMessage = 'Notes fetched successfully.';
        } else {
          // Handle unexpected response status codes (e.g., 404, 500)
          this.createNoteMessage = `Failed to fetch notes. Server returned status code ${response.status}.`;
        }
      } catch (error) {
        this.createNoteMessage = `Failed to fetch notes: ${error.message}`;
      }
    },
    showNotesList() {
      // TODO
      this.isCreateNoteVisible = false;
      this.newNoteTitle = '';
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
    methods: {
        async fetchNotes() {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
                this.createNoteMessage = 'Fetching notes...';

                const response = await authService.fetch_notes();
                console.log(response)
                // Check if the response status code indicates success (e.g., 200)
                if (response.status === 200) {
                    // Update your notes data here
                    this.notes = response.data;
                    this.createNoteMessage = 'Notes fetched successfully.';
                } else {
                    // Handle unexpected response status codes (e.g., 404, 500)
                    this.createNoteMessage = `Failed to fetch notes. Server returned status code ${response.status}.`;
                }
            } catch (error) {
                this.createNoteMessage = `Failed to fetch notes: ${error.message}`;
            }
        },
        showNotesList() {
            this.isCreateNoteVisible = false;
            this.newNoteTitle = '';
            this.createNoteMessage = '';
            this.selectedNote = null;
            this.editingNote = null;

            this.fetchNotes();
        },
        selectNoteForEdit(note) {
            if (note) {
                // this.editingNote = JSON.parse(JSON.stringify(note));
                this.editingNote = {
                    title: note.name,
                    content: note.content,
                    id: note.ownerId // Make sure to include the note's ID if needed for updates
                };
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
            if (!this.newNoteTitle) {
                this.createNoteMessage = 'Please fill in all fields.';
                return;
            }
            try {
                // join user token everytime I send request
                console.log("store")
                console.log(store.state)
                axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
                this.createNoteMessage = 'Creating note...';
                const noteData = { name: this.newNoteTitle };
                const response = await axios.post('https://localhost:3000/notes', noteData);
                console.log(response)
                this.notes.push(response.data); // Add new note to notes array
                this.newNoteTitle = ''
                this.isCreateNoteVisible = false;
                this.createNoteMessage = 'Note created successfully.';
                this.fetchNotes()

            } catch (error) {
                this.createNoteMessage = `Failed to create note: ${error.message}`;
            }
        },
        async updateNote() {
            try {
                // join user token everytime I send request
                console.log("store")
                console.log(store.state)
                axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
                this.createNoteMessage = 'Editing note...';
                const noteData = { name: this.editingNote.title, content: this.editingNote.content };
                const response = await authService.edit_note(noteData);
                console.log(response)
                for (let i = 0; i < this.notes.length; i++) {
                    if (this.notes[i].ownerId === this.editingNote.id) {
                        // Update the note in the 'notes' array
                        this.notes[i] = await authService.edit_note(noteData);
                        break; // Exit the loop once the note is updated
                    }
                }
                // this.notes.push(response.data); // Add new note to notes array
                this.isCreateNoteVisible = false;
                this.createNoteMessage = 'Note updated successfully.';
            } catch (error) {
                this.createNoteMessage = `Failed to update note: ${error.message}`;
            }
            /*const index = this.notes.findIndex(note => note.id === this.editingNote.id);
            if (index !== -1) {
                this.notes[index] = { ...this.editingNote };
                this.editingNote = null;
                this.createNoteMessage = 'Note updated successfully.';
            } else {
                this.createNoteMessage = 'Error: Note not found.';
            }*/
            this.editingNote = null;
        },
        // In your Vue.js component
        async deleteNote() {
            if (!confirm('Are you sure you want to delete this note?')) {
                return; // Stop if user cancels
            }
            console.log("Entered Delete Note method")
            try {
                console.log("Editing note: ", this.editingNote.id)
                // Call the deleteNote method with the note's ID
                await authService.deleteNote(this.editingNote.id);
                console.log("After wait")

                // Handle success, e.g., remove the note from the UI
                const noteIndex = this.notes.findIndex(note => note.id === this.editingNote.id);
                if (noteIndex !== -1) {
                    this.notes.splice(noteIndex, 1);
                }

                // Reset the editingNote
                this.editingNote = null;

                // Set a success message or perform any other desired actions
                this.createNoteMessage = 'Note deleted successfully.';
            } catch (error) {
                // Handle errors, e.g., show an error message
                this.createNoteMessage = `Failed to delete note: ${error.message}`;
            }
        },

        cancelCreateNote() {
            this.isCreateNoteVisible = false;
            this.newNoteTitle = '';
            this.createNoteMessage = '';
            this.editingNote = null;
        },
        cancelEdit() {
            this.editingNote = null;
            this.createNoteMessage = '';
        },
        logout() {
            // Reset the authentication state in the Vuex store
            this.$store.commit('setAuthentication', false);
            this.$store.commit('setToken', null);
            this.$store.commit('setUserEmail', null);

      // Redirect to the login page
      this.$router.push('/');

    },
  }
}
</script>

<style scoped src="./DashboardStyles.css">
/* This will import styles from DashboardStyles.css */
</style>
