<template>
    <div>
      <h2>Transactions</h2>
      <button @click="exportToPDF">Export to PDF</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Portfolio Number</th>
            <th>Name of Client</th>
            <th>Share symbol/code</th>
            <th>Share name</th>
            <th>Transaction Type</th>
            <th>Transaction ID</th>
            <th>No. of Shares</th>
            <th>Unit price</th>
            <th>Net Amount</th>
            <th>Brokerage/Other charges</th>
            <th>Profit/loss</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in data" :key="transaction.id">
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
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    props: ['data'],
    methods: {
      exportToPDF() {
        const doc = new jsPDF();
        doc.autoTable({
          head: [['Date', 'Portfolio Number', 'Name of Client', 'Share symbol/code', 'Share name', 'Transaction Type', 'Transaction ID', 'No. of Shares', 'Unit price', 'Net Amount', 'Brokerage/Other charges', 'Profit/loss']],
          body: this.data.map(item => [
            item.TRADE_DATE,
            item.SECURITY_ACCOUNT,
            item.SAM_NAME,
            item.SECURITY_NUMBER,
            item.SECURITY_NAME,
            item.TRANS_TYPE,
            item.RECID,
            item.NO_NOMINAL,
            item.PRICE,
            item.NET_AMT_TRADE,
            item.BROKER_COMMS,
            item.PROF_LOSS_SEC_CCY
          ])
        });
        doc.save('transactions.pdf');
      }
    }
  };
  </script>
  