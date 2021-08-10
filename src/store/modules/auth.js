import { AuthService } from '@/services/auth-service.js'
import { checkError } from '@/config/errors.js'

export default {
  namespaced: true,

  state: {
    posts: [],
    token: localStorage.getItem('access_token') || null,
    error: null,
    loader: false,
    profile: [],
    drawer: true
  },

  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setLoader(state, payload) {
      state.loader = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setClearError(state) {
      state.error = null;
    },
    destroyToken(state) {
      state.token = null;
    },
    setProfile(state, payload) {
      state.profile = payload;
    },
    setClearProfile(state) {
      state.profile = [];
    },
    setDrawer(state, payload) {
      state.drawer = payload;
    },
  },

  actions: {
    retrieveToken({ commit }, credentials) {
      commit('setLoader', true);
      commit('setClearError');

      let data = {
        email: credentials.email,
        password: credentials.password
      };
      return new Promise((resolve) => {
        AuthService.login(data)
          .then(response => {
            commit('setLoader', false);
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            commit('setToken', token)
            commit('setProfile', response.data.user);    
            resolve(response)
          })
          .catch(error => {

            let errorData = error.response.data;

            if (errorData.error === "invalid_grant") {             
              commit('setError', ['Invalid login credentials']);
            }
            else if (errorData.error === "invalid_request") {             
              commit('setError', ['Please enter email and password']);
            }
            else {
              let errorOutput = checkError.errorFormatting(errorData);
              commit('setError', errorOutput);
            }
            commit('setLoader', false);

            localStorage.removeItem('access_token')
            commit('setToken', null)

          })
      })
    },

    clearError({ commit }) {
      commit('setClearError');
    },

    changeDrawer({ commit }, value) {
      commit('setDrawer', value);
    },    

    destroyToken(context) {
      context.commit('setClearError');
      return new Promise((resolve) => {
        AuthService.logout()
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken');
            context.commit('setToken', null);
            context.commit('setClearProfile', null);
            context.commit('setLoader', false);
            resolve(response)
          })
          .catch(error => {
            context.commit('setLoader', false);
            context.commit('setError', error.response.data);
          })
      })

    }   
  },

  getters: {
    loading(state) {
      return state.loader;
    },
    errors(state) {
      return state.error;
    },
    token(state) {
      return state.token;
    },
    profile(state) {
      return state.profile;
    },
    drawer(state) {
      return state.drawer;
    }

  }
}
