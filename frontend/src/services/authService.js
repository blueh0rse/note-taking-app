import axios from 'axios';

const API_URL = 'http://yourapi.com/auth'; // Replace with your API URL

export default {
  login(username, password) {
    return axios.post(`${API_URL}/login`, { username, password });
  },
  signup(username, password) {
    return axios.post(`${API_URL}/signup`, { username, password });
  }
};
