<template>
  <div class="note-editor">
    <input v-model="note.title" placeholder="Titolo della nota" />
    <textarea v-model="note.content" placeholder="Contenuto della nota"></textarea>
    <button @click="saveNote">Salva Nota</button>
  </div>
</template>

<script>
export default {
  name: 'NoteEditor',
  props: ['selectedNote'],
  data() {
    return {
      note: {
        title: '',
        content: ''
      }
    };
  },
  watch: {
    selectedNote: {
      immediate: true,
      handler(newNote) {
        this.note = newNote ? {...newNote} : { title: '', content: '' };
      }
    }
  },
  methods: {
    saveNote() {
      this.$emit('saveNote', this.note);
    }
  }
};
</script>

<style>
.note-editor {
  margin-top: 20px;
}
.note-editor input, .note-editor textarea {
  width: 100%;
  margin-bottom: 10px;
}
</style>

