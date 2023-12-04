<template>
    <div class="group-management">
        <h2>Group Management</h2>
        <form @submit.prevent="createGroup">
        <div>
            <label for="groupName">Group Name:</label>
            <input type="text" id="groupName" v-model="groupName" required>
        </div>
        <button type="submit">Create Group</button>
        </form>
        <h3>Your Groups</h3>
        <ul>
        <li v-for="group in userGroups" :key="group.id">
            <a @click="navigateToGroup(group.id)">{{ group.name }}</a>
        </li>
        </ul>
        <!-- Group Invitations -->
        <h3>Group Invitations</h3>
        <div v-for="invitation in groupInvitations" :key="invitation.id">
        <p>{{ invitation.groupName }}</p>
        <button @click="acceptInvitation(invitation.id)">Accept</button>
        <button @click="declineInvitation(invitation.id)">Decline</button>
        </div>
        <component :is="currentComponent" :key="currentComponentKey"></component>
    </div>
</template>
  
<script>
import axios from 'axios';
import GroupDashboard from './GroupDashboard.vue';

export default {
  name: 'GroupManagement',
  data() {
    return {
      currentComponent: GroupDashboard,
      currentComponentKey: 1,
      groupName: '',
      userGroups: [], // Mock or fetched data
      groupInvitations: [], // Mock or fetched data
    };
  },
  created() {
    this.fetchUserGroups();
    this.fetchGroupInvitations();
  },
  methods: {
    createGroup() {
    // Check for empty group name
    if (!this.groupName.trim()) {
      alert('Please enter a group name.');
      return;
    }

    // API call to create the group
    axios.post('http://localhost:3000/groups', { name: this.groupName })
      .then(response => {
        // Assuming the response contains the new group data
        const newGroup = response.data;
        this.userGroups.push(newGroup);

        // Reset the form and potentially give feedback to the user
        this.groupName = '';
        alert('Group created successfully!');
      })
      .catch(error => {
        console.error('Error creating group:', error);
        // Display error message to the user
        alert('Failed to create group. Please try again.');
      });
    },
    fetchUserGroups() {
        axios.get('http://localhost:3000/user/groups')
        .then(response => {
            this.userGroups = response.data; // Assuming response contains user's groups
        })
        .catch(error => {
            console.error('Error fetching groups:', error);
            // Handle errors (e.g., display a message to the user)
        });
    },

    fetchGroupInvitations() {
        axios.get('http://localhost:3000/user/group-invitations')
        .then(response => {
            this.groupInvitations = response.data; // Assuming response contains group invitations
        })
        .catch(error => {
            console.error('Error fetching group invitations:', error);
            // Handle errors
        });
    },
    navigateToGroup(groupId) {
      this.currentComponent = GroupDashboard;
      this.currentComponentKey = groupId;
    },
    acceptInvitation(invitationId) {
    axios.post(`http://localhost:3000/user/group-invitations/${invitationId}/accept`)
        .then(() => {
        this.groupInvitations = this.groupInvitations.filter(invite => invite.id !== invitationId);
        this.fetchUserGroups(); // Re-fetch groups to update the list
        })
        .catch(error => {
            console.error('Error accepting invitation:', error);
            // Handle errors
        });
    },

    declineInvitation(invitationId) {
        axios.post(`http://localhost:3000/user/group-invitations/${invitationId}/decline`)
        .then(() => {
            // Remove the declined invitation from the list
            this.groupInvitations = this.groupInvitations.filter(invite => invite.id !== invitationId);
        })
        .catch(error => {
            console.error('Error declining invitation:', error);
            // Handle errors
        });
    },
  }
};
</script>
  
<style>

</style>
  