<template>
    <div class="dashboard-container">
      <header>
        <h1>Dashboard</h1>
        <button @click="logout">Logout</button>
      </header>
      <div class="content">
        <h2 class="centered">Securities Transactions</h2>
        <div class="button-container">
          <button class="print-button" @click="printPDF">Print Report</button>
        </div>
        <transaction-table ref="transactionTable"></transaction-table>
      </div>
    </div>
  </template>
  
  <script>
  import TransactionTable from './TransactionTable';
  
  export default {
    components: {
      TransactionTable
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/');
      },
      printPDF() {
        this.$refs.transactionTable.printPDF();
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
  
  .content h2.centered {
    text-align: center;
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
  }
  
  .table-container {
    overflow-x: auto;
  }
  .print-button {
  background: #d9534f; /* Red background */
  color: white;
  padding: 10px 10px;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 20px; /* Margin for spacing */
}

.print-button:hover {
  background: #c9302c; /* Darker red on hover */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* Align the button to the right */
  margin-bottom: 20px; /* Space below the button */
}

  </style>
  