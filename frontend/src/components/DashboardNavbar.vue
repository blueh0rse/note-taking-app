<template>
  <nav class="navbar">
    <ul>
      <li><button @click="emitShowNotesEvent" class="custom-button">Show Notes</button></li>
      <li><button @click="emitCreateNoteEvent" class="custom-button">Create Note</button></li>
      <li><button @click="emitLogoutEvent" class="custom-button">Logout</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'DashboardNavbar',

  methods: {
    emitShowNotesEvent() {
      this.$emit('show-notes');
    },
    emitCreateNoteEvent() {
      this.$emit('create-note');
    },
    emitLogoutEvent() {
      this.$emit('logout');
    },
  }
}
</script>

<style scoped>
.custom-button {
  background-color: #007bff;
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-right: 30px; 
}

.custom-button:last-child {
  margin-right: 1; 
}

.custom-button:hover {
  background-color: #0056b3;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: cornflowerblue;
  display: flex;
}

.navbar li {
  margin: 0;
  padding: 0;
}
</style>
