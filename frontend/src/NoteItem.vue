<template>
    <div class="note-item" @click="emitSelectNote">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <button @click="confirmDeletion(note.id)" class="delete-note-button">Delete</button>
    </div>
</template>
  
<script>
  export default {
    props: {
      note: {
        type: Object,
        required: true
      }
    },
    methods: {
        confirmDeletion(noteId) {
            if (confirm('Are you sure you want to delete this note?')) {
            this.$emit('delete-note', noteId);
            }
        },
        emitSelectNote() {
        this.$emit('select-note', this.note);
        },
    }
  };
</script>
  
<style>
.note-item {
  cursor: pointer;
  /* Additional styles... */
}
</style>