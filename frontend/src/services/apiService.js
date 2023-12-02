export default {
  saveNote(noteContent) {
    return axios.post('/api/notes', { content: noteContent });
  },
  getNote(id) {
    return axios.get(`/api/notes/${id}`);
  }
  // Other API methods
}
