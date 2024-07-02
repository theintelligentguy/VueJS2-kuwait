<template>
    <div class="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <button @click="logout">Logout</button>
      </header>
      <div class="content">
        <h2>Securities Transactions</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>RECID</th>
                <th>ENTRYID</th>
                <th>SECURITY_ACCOUNT</th>
                <th>SECURITY_NUMBER</th>
                <th>DEPOSITORY</th>
                <th>TRADE_DATE</th>
                <th>VALUE_DATE</th>
                <th>TRANS_TYPE</th>
                <th>SECURITY_CURRENCY</th>
                <th>PRICE_TYPE</th>
                <th>TRADE_CURRENCY</th>
                <th>NO_NOMINAL</th>
                <th>PRICE</th>
                <th>GROSS_AMT_TRD_CURR</th>
                <th>BROKER_COMMS</th>
                <th>NET_AMT_TRADE</th>
                <th>ACCOUNT_NUMBER</th>
                <th>ACCOUNT_CURRENCY</th>
                <th>REF_CURRENCY</th>
                <th>DELIVERY_INSTR</th>
                <th>COST_INVST_SEC_CCY</th>
                <th>COST_INVST_REF_CCY</th>
                <th>PROF_LOSS_SEC_CCY</th>
                <th>REVERSAL_DATE</th>
                <th>DATE_UPDATED</th>
                <th>BOOK_COST_SEC_CCY</th>
                <th>BOOK_COST_REF_CCY</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction.RECID">
                <td>{{ transaction.RECID }}</td>
                <td>{{ transaction.ENTRYID }}</td>
                <td>{{ transaction.SECURITY_ACCOUNT }}</td>
                <td>{{ transaction.SECURITY_NUMBER }}</td>
                <td>{{ transaction.DEPOSITORY }}</td>
                <td>{{ transaction.TRADE_DATE }}</td>
                <td>{{ transaction.VALUE_DATE }}</td>
                <td>{{ transaction.TRANS_TYPE }}</td>
                <td>{{ transaction.SECURITY_CURRENCY }}</td>
                <td>{{ transaction.PRICE_TYPE }}</td>
                <td>{{ transaction.TRADE_CURRENCY }}</td>
                <td>{{ transaction.NO_NOMINAL }}</td>
                <td>{{ transaction.PRICE }}</td>
                <td>{{ transaction.GROSS_AMT_TRD_CURR }}</td>
                <td>{{ transaction.BROKER_COMMS }}</td>
                <td>{{ transaction.NET_AMT_TRADE }}</td>
                <td>{{ transaction.ACCOUNT_NUMBER }}</td>
                <td>{{ transaction.ACCOUNT_CURRENCY }}</td>
                <td>{{ transaction.REF_CURRENCY }}</td>
                <td>{{ transaction.DELIVERY_INSTR }}</td>
                <td>{{ transaction.COST_INVST_SEC_CCY }}</td>
                <td>{{ transaction.COST_INVST_REF_CCY }}</td>
                <td>{{ transaction.PROF_LOSS_SEC_CCY }}</td>
                <td>{{ transaction.REVERSAL_DATE }}</td>
                <td>{{ transaction.DATE_UPDATED }}</td>
                <td>{{ transaction.BOOK_COST_SEC_CCY }}</td>
                <td>{{ transaction.BOOK_COST_REF_CCY }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        transactions: []
      };
    },
    created() {
      this.fetchTransactions();
    },
    methods: {
      async fetchTransactions() {
        try {
          const response = await axios.get('http://localhost:3000/api/transactions', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.transactions = response.data;
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      },
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      }
    }
  };
  </script>
<style scoped>
body {
  background: #f0f2f5;
  font-family: 'Arial', sans-serif;
}

.dashboard-container {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 24px;
  color: #333;
}

header button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

header button:hover {
  background: #0056b3;
}

.content {
  margin-top: 20px;
}

.content h2 {
  font-size: 20px;
  color: #555;
  margin-bottom: 10px;
}

.table-container {
  overflow-x: auto; /* Make the table container scrollable horizontally */
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px; /* Make the font smaller */
  min-width: 1500px; /* Minimum width to ensure horizontal scrolling */
}

table th,
table td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
  white-space: nowrap; /* Prevent text from wrapping */
}

table th {
  background: #f5f5f5;
  color: #333;
}

table tbody tr:nth-child(even) {
  background: #f9f9f9;
}

</style>  