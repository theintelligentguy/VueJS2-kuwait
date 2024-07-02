<template>
  <div>
    <h1>Dashboard</h1>
    <form @submit.prevent="fetchTransactions">
      <div>
        <label for="fromDate">From Date:</label>
        <input type="date" v-model="fromDate" required>
      </div>
      <div>
        <label for="toDate">To Date:</label>
        <input type="date" v-model="toDate" required>
      </div>
      <div>
        <label for="portfolioNumber">Portfolio Number:</label>
        <input type="text" v-model="portfolioNumber">
      </div>
      <div>
        <label for="shareSymbol">Share Symbol/Code:</label>
        <input type="text" v-model="shareSymbol">
      </div>
      <div>
        <label for="securityCurrency">Security Currency:</label>
        <input type="text" v-model="securityCurrency">
      </div>
      <button type="submit">Search</button>
    </form>
    <div v-if="transactions.length">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Portfolio Number</th>
            <th>Name of Client</th>
            <th>Share Symbol/Code</th>
            <th>Share Name</th>
            <th>Transaction Type</th>
            <th>Transaction ID</th>
            <th>No. of Shares</th>
            <th>Unit Price</th>
            <th>Net Amount</th>
            <th>Brokerage/Other Charges</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.RECID">
            <td>{{ transaction.TRADE_DATE }}</td>
            <td>{{ transaction.SECURITY_ACCOUNT }}</td>
            <td>{{ transaction.SAM_NAME }}</td>
            <td>{{ transaction.SECURITY_NUMBER }}</td>
            <td>{{ transaction.SECURITY_NAME }}</td>
            <td>{{ transaction.TRANS_TYPE }}</td>
            <td>{{ transaction.RECID }}</td>
            <td>{{ transaction.NO_NOMINAL }}</td>
            <td>{{ transaction.PRICE }}</td>
            <td>{{ transaction.NET_AMT_TRADE }}</td>
            <td>{{ transaction.BROKER_COMMS }}</td>
            <td>{{ transaction.PROF_LOSS_SEC_CCY }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fromDate: '',
      toDate: '',
      portfolioNumber: '',
      shareSymbol: '',
      securityCurrency: '',
      transactions: []
    }
  },
  methods: {
    async fetchTransactions () {
      const response = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          fromDate: this.fromDate,
          toDate: this.toDate,
          portfolioNumber: this.portfolioNumber,
          shareSymbol: this.shareSymbol,
          securityCurrency: this.securityCurrency
        })
      })
      this.transactions = await response.json()
    }
  }
}
</script>
