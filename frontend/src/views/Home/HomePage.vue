<template>
  <!-- Conditional rendering of Login and Sign Up forms -->
  <div class="auth-forms">
    <h2 v-if="!isSignupVisible">Login</h2> <!-- Display "Login" heading when not in Sign Up mode -->
    <h2 v-if="isSignupVisible">Sign Up</h2> <!-- Display "Sign Up" heading when in Sign Up mode -->

    <!-- Login Form -->
    <form @submit.prevent="login" v-if="!isSignupVisible">
      <input type="text" v-model="email" placeholder="Email" required />
      <!-- Password input field -->
      <div class="password-input">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required />
        <!-- Button to toggle password visibility -->
        <button type="button" @click.prevent="showPassword = !showPassword">
          {{ showPassword ? 'Hide Password' : 'Show Password' }} <!-- Toggle button text -->
        </button>
      </div>
      <p v-if="loginError" class="error">{{ loginError }}</p> <!-- Display login error message if there's one -->
      <button type="submit">Login</button> <!-- Login button -->
    </form>

    <!-- "Sign Up" Button (Switch to Sign Up mode) -->
    <button @click="showSignupForm(); resetLoginForm()" v-if="!isSignupVisible">Sign Up</button>
  </div>

  <!-- Sign Up Form -->
  <div v-if="isSignupVisible" class="auth-forms">
    <form @submit.prevent="signup">
      <input type="email" v-model="signupEmail" placeholder="Email" required
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
      <!-- Password input field -->
      <div class="password-input">
        <input :type="showSignupPassword ? 'text' : 'password'" v-model="signupPassword" placeholder="Password"
          required />
        <input :type="showSignupPassword ? 'text' : 'password'" v-model="signupPasswordConfirm" placeholder="Confirm Password" required />
        <!-- Button to toggle password visibility -->
        <button type="button" @click.prevent="showSignupPassword = !showSignupPassword" class="toggle-password-btn">
          {{ showSignupPassword ? 'Hide' : 'Show' }} Passwords
        </button>
      </div>
      <p class="password-instruction">Please choose a password that contains 10 characters, including a number and a
        special character.</p>
      <p v-if="signupError" class="error">{{ signupError }}</p> <!-- Display signup error message if there's one -->
      <button type="submit">Sign Up</button> <!-- Sign Up button -->
      <button @click="resetSignupForm">Cancel</button> <!-- Cancel button for Sign Up -->
    </form>
  </div>
</template>



<script>
import authService from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
      isSignupVisible: false,
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
      signupPasswordConfirm: '',
      loginError: '',
      showPassword: false, // Initial state for showing/hiding password in login form
      showSignupPassword: false, // Initial state for showing/hiding password in sign-up form
      signupError: '',
    };
  },
  methods: {
    async login() {
      try {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password 
        }).then(() => {
          this.$router.push({ path: '/dashboard' });
        }).catch((error) => {
          console.error("Login failed:", error);
        });
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
        const response = await authService.signup(this.signupEmail, this.signupPassword);
        console.log(response)

        // in response.data.message you have the message

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
      this.email = '';
      this.loginPassword = '';
      this.loginError = '';
    },
  }
}
</script>

<style scoped src="./HomeStyles.css">
/* This will import styles from HomeStyles.css */
</style>