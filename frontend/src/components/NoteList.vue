<template>
  <div class="note-list">
    <div v-for="note in notes" :key="note.id" @click="selectNote(note)">
      <h3>{{ note.title }}</h3>
      <p>{{ note.summary }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  props: ['notes'],
  methods: {
    selectNote(note) {
      this.$emit('selectNote', note);
    }
  }
};
</script>

<style>
.note-list div {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.note-list div:hover {
  background-color: #f0f0f0;
}
</style>

