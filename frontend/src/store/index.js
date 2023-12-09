import Vuex from "vuex";
import axios from "axios";

/*const state = {
  // Define initial application state
};*/

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null,
    userEmail: null,
    API_URL: process.env.VUE_APP_API_URL,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
      console.log("STATE:" + state.isAuthenticated);
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    // other mutations
  },
  actions: {
    login({ commit }, credentials) {
      // Perform login
      axios
        .post(this.state.API_URL + "/login", credentials)
        .then((response) => {
          // Set isAuthenticated to true
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${this.state.token}`;
          commit("setAuthentication", true);
          // Save the JWT token
          commit("setToken", response.data.token);
          // Save the user's email
          commit("setUserEmail", credentials.email);
        })
        .catch((error) => {
          // Set isAuthenticated to false on error
          commit("setAuthentication", false);
          console.error("Login failed:", error);
        });
    },
    // other actions
  },
  // getters and other store parts
});

<script></script>;
