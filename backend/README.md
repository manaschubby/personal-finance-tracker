# Personal Finance Tracker - Backend

This is the backend part of the Personal Finance Tracker application. It provides an API for managing income and expense transactions and interacting with a database.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Setup Instructions

1. Clone the repository:

   ```shell
   git clone <backend-repo-url>
   ```

2. Navigate to the backend directory:

   ```shell
   cd personal-finance-tracker-backend
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the database:
   - Install MongoDB and make sure it is running on your system.
   - Create a new MongoDB database named `finance-tracker` or update the database connection URL in `server.js` file to your desired database.

5. Start the server:

   ```shell
   node server.js
   ```

   The backend server will be running on http://localhost:5000.

## API Endpoints

- GET `/api/transactions`: Get all transactions
- POST `/api/transactions`: Add a new transaction
- DELETE `/api/transactions/:id`: Delete a transaction by ID

## Configuration

The backend server is configured to allow requests from the frontend running at `http://localhost:3000`. If you need to adjust the CORS configuration or modify other server settings, you can do so in the `server.js` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Feel free to modify these README templates to suit your project structure and additional requirements. Include any specific instructions, deployment details, or additional features as needed.