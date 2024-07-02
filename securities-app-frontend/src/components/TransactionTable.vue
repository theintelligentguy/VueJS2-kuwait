<template>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="filteredTransactions"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
      >
        <template v-slot:no-data>
          <div class="no-data-message">No data available</div>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'Date', value: 'TRADE_DATE' },
          { text: 'Portfolio Number', value: 'SECURITY_ACCOUNT' },
          { text: 'Name of Client', value: 'SAM_NAME' },
          { text: 'Share Symbol/Code', value: 'SECURITY_NUMBER' },
          { text: 'Share Name', value: 'SECURITY_NAME' },
          { text: 'Transaction Type', value: 'TRANS_TYPE' },
          { text: 'TRX/NO.', value: 'RECID' },
          { text: 'No. of Shares', value: 'NO_NOMINAL' },
          { text: 'Unit Price', value: 'PRICE' },
          { text: 'Net Amount', value: 'NET_AMT_TRADE' },
          { text: 'Brokerage/ Other Charges', value: 'BROKER_COMMS' },
          { text: 'Total Amount', value: 'TOTAL_AMOUNT' },
          { text: 'Profit/Loss', value: 'PROF_LOSS_SEC_CCY' }
        ],
        transactions: []
      };
    },
    computed: {
      filteredTransactions() {
        // Calculate the Total Amount here (Net Amount + Brokerage/ Other Charges)
        return this.transactions.map(transaction => ({
          ...transaction,
          TOTAL_AMOUNT: transaction.NET_AMT_TRADE + transaction.BROKER_COMMS
        }));
      },
      fromDate() {
        if (this.transactions.length === 0) return '';
        return this.transactions.reduce((min, transaction) => {
          return transaction.TRADE_DATE < min ? transaction.TRADE_DATE : min;
        }, this.transactions[0].TRADE_DATE);
      },
      toDate() {
        if (this.transactions.length === 0) return '';
        return this.transactions.reduce((max, transaction) => {
          return transaction.TRADE_DATE > max ? transaction.TRADE_DATE : max;
        }, this.transactions[0].TRADE_DATE);
      },
      currency() {
        if (this.transactions.length === 0) return '';
        return this.transactions[0].SECURITY_CURRENCY;
      }
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
      printPDF() {
        const doc = new jsPDF();
  
        // Add header
        const headerText = `Statement of Transaction by Date/Currency From Date: ${this.fromDate} To: ${this.toDate} \n Currency: KWD`;
        doc.setFontSize(8);
        doc.text(headerText, 8, 8);
  
        const columns = [
          { title: 'Date', dataKey: 'TRADE_DATE' },
          { title: 'Portfolio Number', dataKey: 'SECURITY_ACCOUNT' },
          { title: 'Name of Client', dataKey: 'SAM_NAME' },
          { title: 'Share Symbol/Code', dataKey: 'SECURITY_NUMBER' },
          { title: 'Share Name', dataKey: 'SECURITY_NAME' },
          { title: 'Transaction Type', dataKey: 'TRANS_TYPE' },
          { title: 'TRX/NO.', dataKey: 'RECID' },
          { title: 'No. of Shares', dataKey: 'NO_NOMINAL' },
          { title: 'Unit Price', dataKey: 'PRICE' },
          { title: 'Net Amount', dataKey: 'NET_AMT_TRADE' },
          { title: 'Brokerage/ Other Charges', dataKey: 'BROKER_COMMS' },
          { title: 'Total Amount', dataKey: 'TOTAL_AMOUNT' },
          { title: 'Profit/Loss', dataKey: 'PROF_LOSS_SEC_CCY' }
        ];
        const rows = this.filteredTransactions.map(transaction => ({
          TRADE_DATE: transaction.TRADE_DATE,
          SECURITY_ACCOUNT: transaction.SECURITY_ACCOUNT,
          SAM_NAME: transaction.SAM_NAME,
          SECURITY_NUMBER: transaction.SECURITY_NUMBER,
          SECURITY_NAME: transaction.SECURITY_NAME,
          TRANS_TYPE: transaction.TRANS_TYPE,
          RECID: transaction.RECID,
          NO_NOMINAL: transaction.NO_NOMINAL,
          PRICE: transaction.PRICE,
          NET_AMT_TRADE: transaction.NET_AMT_TRADE,
          BROKER_COMMS: transaction.BROKER_COMMS,
          TOTAL_AMOUNT: transaction.TOTAL_AMOUNT,
          PROF_LOSS_SEC_CCY: transaction.PROF_LOSS_SEC_CCY
        }));
  
        doc.autoTable({
          startY: 20, // Adjust start position to below the header
          head: [columns.map(col => col.title)], // Pass an array of titles for the header row
          body: rows.map(row => columns.map(col => row[col.dataKey])), // Pass an array of row data
          theme: 'grid',
          styles: { fontSize: 6, cellPadding: 3 }, // Smaller font size and cell padding for better readability
          headStyles: { fontSize: 6,  cellPadding: 2,fillColor: [184, 184, 184] }, // Smaller font size for header
          columnStyles: {
            TRADE_DATE: { cellWidth: 20 },
            SECURITY_ACCOUNT: { cellWidth: 30 },
            SAM_NAME: { cellWidth: 30 },
            SECURITY_NUMBER: { cellWidth: 30 },
            SECURITY_NAME: { cellWidth: 30 },
            TRANS_TYPE: { cellWidth: 30 },
            RECID: { cellWidth: 20 },
            NO_NOMINAL: { cellWidth: 20 },
            PRICE: { cellWidth: 20 },
            NET_AMT_TRADE: { cellWidth: 20 },
            BROKER_COMMS: { cellWidth: 30 },
            TOTAL_AMOUNT: { cellWidth: 20 },
            PROF_LOSS_SEC_CCY: { cellWidth: 20 }
          },
          margin: { top: 10 },
          overflow: 'linebreak' // Ensure content does not overflow
        });
  
        doc.save('report.pdf');
      }
    }
  };
  </script>
  
  <style scoped>
  .v-data-table {
    max-width: 100%;
    overflow-x: auto;
  }
  
  .no-data-message {
    text-align: left;
    color: rgb(116, 116, 116); 
    font-size: 14px;
    margin-left: 0;
  }
  </style>
  