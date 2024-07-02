import axios from 'axios';

const state = {
  users: []
};

const getters = {
  allUsers: state => state.users
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get('/api/users');
    commit('setUsers', response.data);
  },
  async addUser({ commit }, user) {
    const response = await axios.post('/api/users', user);
    commit('newUser', response.data);
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`/api/users/${id}`);
    commit('removeUser', id);
  },
  async updateUser({ commit }, user) {
    const response = await axios.put(`/api/users/${user.id}`, user);
    commit('updateUser', response.data);
  }
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  newUser(state, user) {
    state.users.push(user);
  },
  removeUser(state, id) {
    state.users = state.users.filter(user => user.id !== id);
  },
  updateUser(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
