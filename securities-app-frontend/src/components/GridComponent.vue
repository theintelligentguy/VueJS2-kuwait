<template>
  <div>
    <h2>Securities Transactions</h2>
    <input v-model="searchQuery" placeholder="Search" @input="loadData" />
    <table>
      <thead>
        <tr>
          <th @click="sort('securityName')">Security Name</th>
          <th @click="sort('transactionType')">Transaction Type</th>
          <th @click="sort('amount')">Amount</th>
          <th @click="sort('sector')">Sector</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.securityName }}</td>
          <td>{{ transaction.transactionType }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.sector }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="exportToPDF">Export to PDF</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      transactions: [],
      searchQuery: '',
      sortKey: '',
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 10
    }
  },
  async created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const response = await axios.get('/api/transactions', {
        params: {
          search: this.searchQuery,
          sortKey: this.sortKey,
          sortOrder: this.sortOrder,
          page: this.currentPage,
          pageSize: this.pageSize
        }
      })
      this.transactions = response.data.transactions
    },
    sort (key) {
      this.sortKey = key
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      this.loadData()
    },
    exportToPDF () {
      // Implementation for exporting to PDF
    }
  }
}
</script>
