import Vuex from "vuex";
import axios from "axios";

/*const state = {
  // Define initial application state
};*/

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    // other state properties
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    // other mutations
  },
  actions: {
    login({ commit }, credentials) {
      // Perform login
      axios
        .post("/api/login", credentials)
        .then((response) => {
          commit("setUser", response.data.user); // Use the setUser mutation after a successful login
        })
        .catch((error) => {
          // Handle the login error
          console.error("Login failed:", error);
        });
    },
    // other actions
  },
});

<script></script>;
