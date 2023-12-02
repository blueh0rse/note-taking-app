<template>
    <div class="home-page">
      <Navbar />
      <LoginSignup />
      <!-- Other homepage content -->
    </div>
  </template>
  
<script>
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'HomePage',
    components: {
        Navbar
    }
}
</script>
  