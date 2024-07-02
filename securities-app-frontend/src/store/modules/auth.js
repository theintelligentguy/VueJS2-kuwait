import axios from 'axios';

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
};

const actions = {
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/api/auth/login', user)
        .then(response => {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem('token', token);
          axios.defaults.headers.common['Authorization'] = token;
          commit('auth_success', { token, user });
          resolve(response);
        })
        .catch(error => {
          commit('auth_error');
          localStorage.removeItem('token');
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  }
};

const mutations = {
  auth_request(state) {
    state.status = 'loading';
  },
  auth_success(state, { token, user }) {
    state.token = token;
    state.user = user;
    state.status = 'success';
  },
  auth_error(state) {
    state.status = 'error';
  },
  logout(state) {
    state.status = '';
    state.token = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
