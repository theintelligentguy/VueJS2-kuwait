import axios from 'axios';

const state = {
  transactions: []
};

const getters = {
  allTransactions: state => state.transactions
};

const actions = {
  async fetchTransactions({ commit }) {
    const response = await axios.get('/api/transactions');
    commit('setTransactions', response.data);
  }
};

const mutations = {
  setTransactions(state, transactions) {
    state.transactions = transactions;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
