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
    return axios.put(`${API}/notes/:note_id`, { noteData });
  },
  delete_note(noteData) {
    return axios.delete(`${API}/notes/:note_id`, { noteData });
  },
  test() {
    return axios.get(`${API}/`);
  },
};
