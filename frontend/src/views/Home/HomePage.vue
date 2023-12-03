<template>
  <!-- Navbar is hidden when not logged in -->
  <div class="auth-forms">
    <h2 v-if="!isSignupVisible">Login</h2>
    <h2 v-if="isSignupVisible">Sign Up</h2>
    <form @submit.prevent="login" v-if="!isSignupVisible">
      <input type="text" v-model="loginIdentifier" placeholder="Email or Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <p v-if="loginError" class="error">{{ loginError }}</p>
      <button type="submit">Login</button>
    </form>
    <button @click="showSignupForm(); resetLoginForm()" v-if="!isSignupVisible">Sign Up</button>
  </div>
  <div v-if="isSignupVisible" class="auth-forms">
    <form @submit.prevent="signup">
      <input type="text" v-model="signupUsername" placeholder="Username" required />
      <input type="email" v-model="signupEmail" placeholder="Email" required
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
      <input type="password" v-model="signupPassword" placeholder="Password" required
        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$" />
      <input type="password" v-model="signupPasswordConfirm" placeholder="Confirm Password" required />
      <p class="password-instruction">Please choose a password that contains 10 characters, including a number and a
        special character.</p>
      <p v-if="signupError" class="error">{{ signupError }}</p>
      <button type="submit">Sign Up</button>
      <button @click="resetSignupForm">Cancel</button>
    </form>
  </div>
</template>

<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      loginIdentifier: '',
      password: '',
      isSignupVisible: false,
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      loginError: '',
      signupError: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await authService.login(this.loginIdentifier, this.loginPassword);
        this.loginError = ''; // Clear any previous error
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
    resetSignupForm() {
      this.signupUsername = '';
      this.signupEmail = '';
      this.signupPassword = '';
      this.signupPasswordConfirm = '';
      this.signupError = '';
      this.isSignupVisible = false;
    },
    resetLoginForm() {
      this.loginIdentifier = '';
      this.loginPassword = '';
      this.loginError = '';
    },
  }
}
</script>

<style scoped src="./HomeStyles.css">
/* This will import styles from HomeStyles.css */
</style>