<template>
  <nav class="app-navbar">
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
  name: 'Navbar'
};
</script>

<style>
.app-navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
}
.app-navbar a {
  color: white;
  margin-left: 10px;
}
</style>

