import Vuex from 'vuex';

/*const state = {
  // Define initial application state
};*/

export default new Vuex.Store({
  state: {
    isAuthenticated: true,
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
  }
  /*actions: {
    login({ commit }, credentials) {
      // Perform login and commit authentication status
    },
    // other actions
  },*/
  // getters
});
