<template>
  <!-- Navbar is hidden when not logged in -->
  <div class="login-section">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <button @click="showSignupForm">Sign Up</button>
  </div>
  
  <div v-if="isSignupVisible" class="signup-section">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input type="email" v-model="signupEmail" placeholder="Email" required 
             pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
      <input type="password" v-model="signupPassword" placeholder="Password" 
             required pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$" />
      <input type="password" v-model="signupPasswordConfirm" placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
  <p v-if="loginError" class="error">{{ loginError }}</p>
  <p v-if="signupError" class="error">{{ signupError }}</p>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      isSignupVisible: false,
      signupEmail: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      loginError: '',
      signupError: '',
      // Signup form data
    };
  },
  methods: {
    async login() {
      try {
        const response = await authService.login(this.loginUsername, this.loginPassword);
        this.loginError = ''; // Clear any previous error
        // Redirect to dashboard or update Vuex store
        this.$store.commit('setUser', response.data.user); // Update Vuex store
        this.$router.push('/dashboard'); // Redirect to dashboard
      } catch (error) {
        this.loginError = 'Failed to login. ' + error.message;
      }
    },
    async signup() {
      if (this.signupPassword !== this.signupPasswordConfirm) {
        this.signupError = 'Passwords do not match.';
        return;
      }
      try {
        const response = await authService.signup(this.signupUsername, this.signupPassword);
        this.signupError = ''; // Clear any previous error
        // Redirect or auto-login
        this.$store.commit('setUser', response.data.user); // Update Vuex store
        this.$router.push('/dashboard'); // Redirect to dashboard
      } catch (error) {
        this.signupError = 'Failed to sign up. ' + error.message;
      }
    },
    showSignupForm() {
      this.isSignupVisible = true;
    },
  }
}
</script>

<style scoped src="./HomeStyles.css">
/* This will import styles from HomeStyles.css */
</style>