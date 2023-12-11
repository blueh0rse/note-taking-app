import axios from "axios";
import store from "../store/index";

const API = store.state.API_URL;

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
  edit_note(noteData) {
    return axios.put(`${API}/notes/${noteData.id}`, { noteData });
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
