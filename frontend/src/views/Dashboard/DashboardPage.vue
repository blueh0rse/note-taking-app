<template>
    <div class="dashboard">
        <button @click="createNote">Create Note</button>
        <div class="notes-grid">
            <NoteCard v-for="note in notes" :key="note.id" :note="note" />
        </div>
    </div>
</template>
  
<script>
import NoteCard from '@/components/NoteCard.vue';
import apiService from '@/services/apiService.js';

export default {
    name: 'DashboardPage',
    components: {
        NoteCard
    },
    data() {
        return {
            notes: [] // This will be fetched from backend
        };
    },
    mounted() {
        this.getNotes();
    },
    methods: {
        createNote() {
            // Logic to create a new note
        },
        getNotes() {
            apiService.getNotes()
                .then(response => {
                    this.notes = response.data;
                })
                .catch(error => {
                    this.getNotesError = 'Couldn\' get notes: ' + (error.response.data.message || 'Unknown error');
                });
        },
    }
}
</script>
  