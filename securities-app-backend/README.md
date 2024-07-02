
### Backend README


```markdown
# Backend Application

## Prerequisites
- Node.js
- MySQL

## Setup Instructions

1. **Clone the Repository**:
   - Clone the backend repository:
     ```sh
     git clone <repository_url>
     cd <repository_name>
     ```

2. **Install Dependencies**:
   - Install the necessary dependencies:
     ```sh
     npm install
     ```

3. **Configure Database**:
   - Update the database credentials in `models/index.js`:
     ```javascript
     const sequelize = new Sequelize('securities_transactions', 'your_username', 'your_password', {
       host: 'localhost',
       dialect: 'mysql'
     });
     ```

4. **Import the Database**:
   - Use the provided SQL dump file to set up the database:
   
     #### Using MySQL Workbench
     - Open MySQL Workbench.
     - Go to `Server > Data Import`.
     - Select the option `Import from Self-Contained File`.
     - Choose the `database/securities_transactions.sql` file.
     - Select the `securities_transactions` database (or create it if it doesn't exist).
     - Click `Start Import`.

     #### Using Command Line
     ```sh
     mysql -u your_username -p securities_transactions < database/securities_transactions.sql
     ```

5. **Run the Server**:
   - Start the server:
     ```sh
     npm start
     ```

   - The server should be running on `http://localhost:3000`.

## API Endpoints

- **Authentication**:
  - `POST /api/auth/login`: Login and receive a JWT token.

- **User Management**:
  - `GET /api/users`: Fetch all users.
  - `POST /api/users`: Create a new user.
  - `PUT /api/users/:id`: Update an existing user.
  - `DELETE /api/users/:id`: Delete a user.

- **Securities Transactions**:
  - `POST /api/search`: Search for transactions based on criteria.

## Security
- Use environment variables for sensitive information.
- Secure your API endpoints with JWT authentication.

## Deployment
- Use a process manager like PM2 to keep your application running in production.
- Set up a reverse proxy using Nginx or Apache to manage incoming traffic.
