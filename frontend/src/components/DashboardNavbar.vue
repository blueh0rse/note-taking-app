<template>
  <nav class="navbar">
    <ul>
      <li><button @click="emitShowNotesEvent">Show Notes</button></li>
      <li><button @click="emitCreateNoteEvent">Create Note</button></li>
      <li><button @click="emitLogoutEvent">Logout</button></li>
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
.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

.navbar li {
  float: left;
}

.navbar li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.navbar li a:hover {
  background-color: #111;
}

</style>
