import Vuex from "vuex";
import axios from "axios";

/*const state = {
  // Define initial application state
};*/

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null, // Add a state property for the JWT token
    userEmail: null, // Add a state property for the user email
    // other state properties
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
        .post("https://localhost:3000/login", credentials)
        .then((response) => {
          commit("setAuthentication", true); // Set isAuthenticated to true
          commit("setToken", response.data.token); // Save the JWT token
          console.log("response.data.token");
          console.log(response.data.token);
          console.log("this.state.token");
          console.log(this.state.token);
          commit("setUserEmail", credentials.email); // Save the user's email
        })
        .catch((error) => {
          commit("setAuthentication", false); // Set isAuthenticated to false on error
          console.error("Login failed:", error);
        });
    },
    // other actions
  },
  // getters and other store parts
});

<script></script>;
