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
  edit_note(noteData) {
    return axios.put(`${API}/notes/:note_id`, {noteData});
  },
  delete_note(noteData) {
    return axios.delete(`${API}/notes/:note_id`, {noteData})
  },
  test() {
    return axios.get(`${API}/`);
  },
};
