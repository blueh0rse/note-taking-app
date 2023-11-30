<template>
  <div class="note-list">
    <NoteItem 
      v-for="note in notes" 
      :key="note.id" 
      :note="note"
      @select-note="selectNote"
      @delete-note="deleteNote"
    />
  </div>
</template>

<script>
import axios from 'axios';
import NoteItem from './NoteItem.vue';

export default {
  name: 'NoteList',
  components: {
    NoteItem
  },
  props: ['notes'],
  methods: {
    selectNote(note) {
      this.$emit('selectNote', note);
    },
    deleteNote(noteId) {
      if (confirm('Are you sure you want to delete this note?')) {
        axios.delete(`http://your-backend-api.com/notes/${noteId}`)
          .then(() => {
            this.$emit('note-deleted', noteId);
            alert('Note successfully deleted.');
          })
          .catch(error => {
            console.error('Error deleting note:', error);
            alert('Error deleting note. Please try again.');
          });
      }
    }
  }
};
</script>


<style>
.note-list div {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}
.note-list div:hover {
  background-color: #f0f0f0;
}
</style>

