import Vuex from "vuex";
/*const state = {
  // Define initial application state
};*/

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null, // Add a state property for the JWT token
    userEmail: null, // Add a state property for the user email
    signupSuccessMessage: '',
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setSignupSuccessMessage(state, message) {
      state.signupSuccessMessage = message;
    },
    // other mutations
  },
  getters: {
    // ... other getters
    getSignupSuccessMessage(state) {
      return state.signupSuccessMessage;
    },
  },
});

<script></script>;
