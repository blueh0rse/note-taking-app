import axios from 'axios';

export default {
  getNotes() {
    return axios.get('/api/notes');
  },
  // Other functions for POST, PUT, DELETE requests
}
