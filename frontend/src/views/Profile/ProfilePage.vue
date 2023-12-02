<template>
    <div class="profile-page">
      <h2>User Profile</h2>
      <form @submit.prevent="updateProfile">
        <!-- Form fields for profile details like name, email -->
        <button type="submit">Update Profile</button>
      </form>
      <!-- Additional settings if needed -->
    </div>
  </template>
  
  
<script>
import apiService from '@/services/apiService.js';

export default {
  data() {
    return {
      userProfile: {
        name: '',
        email: '',
        // other profile fields
      }
    };
  },
  methods: {
    loadProfile() {
      apiService.getProfile()
        .then(response => {
          this.userProfile = response.data;
        })
        .catch(error => {
          // Handle errors
        });
    },
    updateProfile() {
      apiService.updateProfile(this.userProfile)
        .then(response => {
          // Handle successful update
        })
        .catch(error => {
          // Handle errors
        });
    }
  },
  mounted() {
    this.loadProfile();
  }
}
</script>
  
<style scoped src="./ProfileStyles.css">
/* CSS specific to ProfilePage */
</style>
  