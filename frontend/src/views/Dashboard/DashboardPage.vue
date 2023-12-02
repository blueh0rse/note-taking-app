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
    methods: {
        createNote() {
            // Logic to create a new note
        }
    }
}
</script>
  