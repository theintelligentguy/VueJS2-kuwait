# MySQL Database Setup

## Prerequisites
- MySQL Server

## Setup Instructions

1. **Install MySQL Server**:
   - Download and install MySQL Server from the [official website](https://dev.mysql.com/downloads/mysql/).
   - Follow the installation instructions for your operating system.

2. **Create Database and Import Data**:
   - Open MySQL Command Line Client or a MySQL GUI (like MySQL Workbench).
   - Execute the following commands to create the database and import the data:

   #### Using MySQL Workbench
   - Open MySQL Workbench.
   - Go to `Server > Data Import`.
   - Select the option `Import from Self-Contained File`.
   - Choose the `securities_transactions.sql` file.
   - Select the `securities_transactions` database (or create it if it doesn't exist).
   - Click `Start Import`.

   #### Using Command Line
   ```sh
   mysql -u your_username -p
   CREATE DATABASE securities_transactions;
   EXIT;

   mysql -u your_username -p securities_transactions < securities_transactions.sql
