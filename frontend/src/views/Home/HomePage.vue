<template>
  <div>
    <!-- Toggle between Login and Signup -->
    <form @submit.prevent="handleAuth">
      <!-- Form fields for username, password -->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'HomePage',
    components: {
        Navbar
    },
    data() {
    return {
      username: '',
      password: '',
      // other relevant data
    };
  },
  methods: {
    handleAuth() {
      // Authentication logic
    }
  }
}
</script>
  