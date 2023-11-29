<template>
  <nav class="navbar">
    <div class="navbar-brand">NoteApp</div>
    <div class="navbar-menu">
      <a href="#/home" v-if="!isLoggedIn && !isSigningUp">Home</a>
      <a href="#/notes" v-if="isLoggedIn">Le Mie Note</a>
      <button @click="$emit('show-registration')" class="nav-button" v-if="!isLoggedIn && !isSigningUp">Sign Up</button>
      <button @click="$emit('show-login')" class="nav-button" v-if="isSigningUp">Log In</button>
      <button @click="$emit('toggle-create-note')" class="nav-button" v-if="isLoggedIn">Create Note</button>
      <button @click="$emit('show-delete-account')" class="nav-button delete-account-button" v-if="isLoggedIn">Delete Account</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    isLoggedIn: Boolean,
    isSigningUp: Boolean
  }
};
</script>


<style>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
}
.navbar a, .navbar .nav-button {
  color: white;
  margin-left: 10px;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
}
.nav-button {
  background-color: #4CAF50; /* Green background for visibility */
}
.delete-account-button {
  background-color: #f44336; /* Red background for delete button */
}
</style>
