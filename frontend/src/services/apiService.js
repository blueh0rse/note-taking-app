export default {
  saveNote(noteContent) {
    return axios.post('/api/notes', { content: noteContent });
  },
  getNote(id) {
    return axios.get(`/api/notes/${id}`);
  },
  getProfile() {
    return axios.get('/api/user/profile');
  },
  updateProfile(profileData) {
    return axios.put('/api/user/profile', profileData);
  },
  getSharedNotes() {
    return axios.get('/api/shared-notes');
  },
}
