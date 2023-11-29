<template>
    <div class="create-note">
      <h2>Create New Note</h2>
      <form @submit.prevent="createNote">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required>
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit">Create Note</button>
      </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    createNote() {
      if (!this.title || !this.content) {
        alert('Please fill in all fields.');
        return;
      }

      axios.post('http://localhost:3000/notes', {
        title: this.title,
        content: this.content
      })
      .then(() => {
        alert('Note successfully created.');
        // Clear form or redirect user
        this.title = '';
        this.content = '';
        // this.$router.push('/path-to-view-note');
      })
      .catch(error => {
        console.error('Error creating note:', error);
        alert('Error creating note. Please try again.');
      });
    }
  }
};
</script>

  
<style>
input, textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
}  
</style>
  