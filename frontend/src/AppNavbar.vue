<template>
  <nav class="navbar">
    <div class="navbar-brand">NoteApp</div>
    <div class="navbar-menu">
      <a href="#/home">Home</a>
      <a href="#/notes">Le Mie Note</a>
      <!-- Aggiungi altri link o pulsanti qui -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar'
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
.navbar a {
  color: white;
  margin-left: 10px;
}
</style>

