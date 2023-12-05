<template>
    <div class="create-note">
      <h2>Create New Note</h2>
      <form @submit.prevent="createNote">
        <div>
          <label for="name">name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <button type="submit">Create Note</button>
      </form>
    </div>
</template>
  
<script>
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

export default {
  data() {
    return {
      name: ''
    };
  },
  methods: {
    createNote() {
      if (!this.name) {
        alert('Please fill in all fields.');
        return;
      }

      axios.post('https://localhost:3000/notes', {
        name: this.name
      })
      .then(() => {
        alert('Note successfully created.');
        // Clear form or redirect user
        this.name = '';
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
  