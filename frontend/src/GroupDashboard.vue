<template>
    <div class="group-dashboard">
        <h2>{{ groupDetails.name }}</h2>
        <p>{{ groupDetails.description }}</p>

        <h3>Shared Notes</h3>
        <ul>
            <li v-for="note in sharedNotes" :key="note.id">
                {{ note.title }}
                <!-- Options to edit or delete note -->
                <button v-if="userRole === 'admin'" @click="editNote(note)">Edit</button>
                <button v-if="userRole === 'admin'" @click="deleteNote(note.id)">Delete</button>
            </li>
        </ul>
        <!-- Button to add a new note -->
        <button @click="addNewNote">Add New Note</button>
        <note-editor v-if="editingOrAddingNote" :note="selectedNote" @save="saveNote"></note-editor>

        <h3>Group Members</h3>
        <ul>
            <li v-for="member in groupMembers" :key="member.id">
                {{ member.name }} - {{ member.role }}
                <!-- Options to change role or remove member -->
                <select @change="changeMemberRole(member.id, $event.target.value)">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
                <button @click="removeMember(member.id)">Remove</button>
            </li>
        </ul>
        <!-- Button to add a new member -->
        <button @click="addNewMember">Add New Member</button>
        <note-editor v-if="selectedNote" :note="selectedNote" @save="saveEditedNote"></note-editor>
    </div>
</template>
  
<script>
import axios from 'axios';
import NoteEditor from './NoteEditor.vue';

export default {
    name: 'GroupDashboard',
    props: {
        groupId: Number
    },
    components: {
        NoteEditor,
    },
    data() {
        return {
            groupDetails: {}, // Group details like name, description
            sharedNotes: [
                { id: 1, title: 'Mock Note 1', content: 'This is a mock note content.' },
                { id: 2, title: 'Mock Note 2', content: 'Another mock note content.' },
                // ...add more mock notes as needed...
            ],
            groupMembers: [
                { id: 1, name: 'John Doe', role: 'admin' },
                { id: 2, name: 'Jane Smith', role: 'member' },
                // ...add more mock members as needed...
            ],
            selectedNote: null,
            editingOrAddingNote: false,
            userRole: 'member',
        };
    },
    created() {
        this.fetchGroupDetails();
        this.fetchSharedNotes();
        this.fetchGroupMembers();
    },
    methods: {
        fetchGroupDetails() {
            // Replace with your actual API call
            axios.get(`http://your-backend-api.com/groups/${this.groupId}`)
                .then(response => {
                    this.groupDetails = response.data;
                })
                .catch(error => console.error('Error fetching group details:', error));
        },
        fetchSharedNotes() {
            // Replace with your actual API call
            axios.get(`http://your-backend-api.com/groups/${this.groupId}/notes`)
                .then(response => {
                    this.sharedNotes = response.data;
                })
                .catch(error => console.error('Error fetching shared notes:', error));
        },
        fetchGroupMembers() {
            // Replace with your actual API call
            axios.get(`http://your-backend-api.com/groups/${this.groupId}/members`)
                .then(response => {
                    this.groupMembers = response.data;
                })
                .catch(error => console.error('Error fetching group members:', error));
        },
        editNote(note) {
            // Set the selected note for editing
            this.selectedNote = note;
        },
        saveEditedNote(editedNote) {
            axios.put(`http://your-backend-api.com/groups/${this.groupId}/notes/${editedNote.id}`, editedNote)
                .then(response => {
                    // Assuming the response contains the updated note data
                    const updatedNote = response.data;

                    // Update the note in the sharedNotes array
                    this.sharedNotes = this.sharedNotes.map(note =>
                        note.id === updatedNote.id ? updatedNote : note
                    );

                    // Reset the selectedNote to null after saving
                    this.selectedNote = null;

                    // Optionally, display a success message
                    alert('Note updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating note:', error);
                    // Handle error (e.g., show error message)
                    alert('Failed to update note. Please try again.');
                });
        },
        deleteNote(noteId) {
            if (confirm('Are you sure you want to delete this note?')) {
                axios.delete(`http://your-backend-api.com/groups/${this.groupId}/notes/${noteId}`)
                    .then(() => {
                        // Remove the note from the sharedNotes array
                        this.sharedNotes = this.sharedNotes.filter(note => note.id !== noteId);

                        // Optionally, display a success message
                        alert('Note deleted successfully!');
                    })
                    .catch(error => {
                        console.error('Error deleting note:', error);
                        // Handle error (e.g., show error message)
                        alert('Failed to delete note. Please try again.');
                    });
            }
        },
        addNewNote() {
            this.selectedNote = {}; // Set selectedNote to an empty object for a new note
            this.editingOrAddingNote = true; // Open NoteEditor for a new note
        },
        saveNote(note) {
            const apiURL = note.id ? `http://your-backend-api.com/groups/${this.groupId}/notes/${note.id}` : `http://your-backend-api.com/groups/${this.groupId}/notes`;
            const apiMethod = note.id ? axios.put : axios.post;

            apiMethod(apiURL, note)
                .then(response => {
                    const savedNote = response.data;

                    if (note.id) {
                        // Update existing note
                        this.sharedNotes = this.sharedNotes.map(n => n.id === savedNote.id ? savedNote : n);
                    } else {
                        // Add new note
                        this.sharedNotes.push(savedNote);
                    }

                    this.editingOrAddingNote = false; // Close NoteEditor
                })
                .catch(error => {
                    console.error('Error saving note:', error);
                    alert('Failed to save note. Please try again.');
                });
        },
        changeMemberRole(memberId, newRole) {
            axios.put(`http://your-backend-api.com/groups/${this.groupId}/members/${memberId}`, { role: newRole })
                .then(() => {
                    // Update the role in the local state
                    this.groupMembers = this.groupMembers.map(member =>
                        member.id === memberId ? { ...member, role: newRole } : member
                    );

                    // Optionally, display a success message
                    alert('Member role updated successfully!');
                })
                .catch(error => {
                    console.error('Error updating member role:', error);
                    // Handle error (e.g., show error message)
                    alert('Failed to update member role. Please try again.');
                });
        },
        removeMember(memberId) {
            if (confirm('Are you sure you want to remove this member?')) {
                axios.delete(`http://your-backend-api.com/groups/${this.groupId}/members/${memberId}`)
                    .then(() => {
                        // Remove the member from the groupMembers array
                        this.groupMembers = this.groupMembers.filter(member => member.id !== memberId);

                        // Optionally, display a success message
                        alert('Member removed successfully!');
                    })
                    .catch(error => {
                        console.error('Error removing member:', error);
                        // Handle error (e.g., show error message)
                        alert('Failed to remove member. Please try again.');
                    });
            }
        },
    }
};
</script>
  
<style></style>
  