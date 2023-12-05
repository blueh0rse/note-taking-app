import axios from "axios";
const API = "https://localhost:3000";

export default {
  saveNote(noteContent) {
    return axios.post(`${API}/notes`, { content: noteContent });
  },
  getNote(id) {
    return axios.get(`${API}/notes/${id}`);
  },
  getProfile() {
    return axios.get("/api/user/profile");
  },
  updateProfile(profileData) {
    return axios.put("/api/user/profile", profileData);
  },
  getSharedNotes() {
    return axios.get("/api/shared-notes");
  },
};
