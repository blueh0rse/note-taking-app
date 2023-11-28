<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
        <div v-if="!isUsernameValid" class="error-message">Username must be longer than 3 characters.</div>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <div v-if="!isEmailValid" class="error-message">Please enter a valid email address.</div>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <div v-if="!isPasswordValid" class="error-message">Password must be at least 6 characters.</div>
      </div>
      <button type="submit" :disabled="!isFormValid">Register</button>
    </form>
  </template>
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  computed: {
    isUsernameValid() {
      return this.username.length > 3;
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPasswordValid() {
      return this.password.length >= 6; // Simple example, can be more complex
    },
    isFormValid() {
      return this.isUsernameValid && this.isEmailValid && this.isPasswordValid;
    }
  },
  methods: {
    handleSubmit() {
      if (this.isFormValid) {
        axios.post('/users', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          // Example: handle success
          console.log('Registration successful', response);
          alert('Registration successful!');
          // Optionally redirect the user to the login page or dashboard
          // this.$router.push('/login');
        })
        .catch(error => {
            console.error('Registration error:', error);
            if (error.response) {
                // If the server responded with a non-2xx status code
                console.log('Data:', error.response.data);
                console.log('Status:', error.response.status);
                console.log('Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error message:', error.message);
            }
        });
      } else {
        // Form is not valid
        alert('Please fill in the form correctly.');
      }
    }
  }
};
</script>


<style>
.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}
</style>