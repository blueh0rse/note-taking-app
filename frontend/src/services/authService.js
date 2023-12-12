import axios from "axios";
// secret management
// require("dotenv").config();

// const API = `${process.env.API_URL}:${process.env.API_PORT}`;
const API = "https://localhost:3000"; // BACKEND

export default {
  login(email, password) {
    return axios.post(`${API}/login`, {
      email,
      password,
    });
  },
  signup(email, password) {
    return axios.post(`${API}/signup`, { email, password });
  },
  fetch_notes() {
    return axios.get(`${API}/notes`);
  },
  // To change note_id for edit and delete
  edit_note(noteId, noteData) {
    return axios.put(`${API}/notes/${noteId}`, { name: noteData.name, content: noteData.content });
  },
  deleteNote(noteId) {
    console.log("deleteNote method entered")
    console.log("noteId: ", noteId)

    // Construct the URL using the noteId
    const url = `${API}/notes/${noteId}`;
    console.log("URL to backend: ", url)
    // Make the DELETE request
    return axios.delete(url);
  },
  test() {
    return axios.get(`${API}/`);
  },
};