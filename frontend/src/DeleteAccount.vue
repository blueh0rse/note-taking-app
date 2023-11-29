<template>
    <div>
      <h2>Delete Your Account</h2>
      <form @submit.prevent="deleteAccount">
        <!-- Include form fields for confirmation (e.g., password) -->
        <div>
          <label for="password">Confirm Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Delete Account</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      password: ''
    };
  },
  methods: {
    deleteAccount() {
      if (!this.password) {
        alert('Please confirm your password.');
        return;
      }

      axios.delete('http://localhost:3000/users', {
        data: { password: this.password }
      })
      .then(() => {
        // Handle success
        alert('Account successfully deleted.');
        this.$router.push('/login');
      })
      .catch(error => {
        console.error('Error deleting account:', error);
        if (error.response && error.response.data) {
          // Display a specific error message from the server
          alert('Error: ' + error.response.data.message);
        } else {
          // Generic error message
          alert('Error deleting account. Please try again.');
        }
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