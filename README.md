# Personal Finance Tracker

The Personal Finance Tracker is a web-based application that allows users to manage their income and expense transactions and view their current balance. It provides a user-friendly interface for adding, editing, and deleting transactions.

The project consists of two main parts:

1. **personal-finance-tracker-frontend**: The frontend part of the application built with JavaScript, HTML, CSS, and React. It handles the user interface and communicates with the backend API to perform CRUD operations on transactions.

2. **personal-finance-tracker-backend**: The backend part of the application built with Node.js, Express.js, and MongoDB. It provides an API for managing transactions and interacts with a MongoDB database for data storage.

## Features

- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- Display current balance

## Technologies Used

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - React

- Backend:
  - Node.js
  - Express.js
  - MongoDB

## Setup Instructions

1. Clone the repository:

   ```shell
   git clone <repository-url>
   ```

2. Set up the frontend:
   - Navigate to the frontend directory:

     ```shell
     cd personal-finance-tracker-frontend
     ```

   - Install the dependencies:

     ```shell
     npm install
     ```

   - Start the development server:

     ```shell
     npm start
     ```

     The frontend application will be accessible at http://localhost:3000.

3. Set up the backend:
   - Navigate to the backend directory:

     ```shell
     cd personal-finance-tracker-backend
     ```

   - Install the dependencies:

     ```shell
     npm install
     ```

   - Set up the database:
     - Install MongoDB and make sure it is running on your system.
     - Create a new MongoDB database named `finance-tracker` or update the database connection URL in the `server.js` file to your desired database.

   - Start the server:

     ```shell
     node server.js
     ```

     The backend server will be running on http://localhost:5000.

4. Access the application:
   - Open your web browser and visit http://localhost:3000 to access the Personal Finance Tracker application.

## API Endpoints

The backend server exposes the following API endpoints:

- GET `/api/transactions`: Get all transactions
- POST `/api/transactions`: Add a new transaction
- DELETE `/api/transactions/:id`: Delete a transaction by ID

You can make HTTP requests to these endpoints to interact with the transaction data.

## Configuration

- Frontend:
  - The frontend is configured to communicate with the backend API at `http://localhost:5000`. If your backend server is running on a different URL or port, update the API endpoint in the frontend code accordingly.

- Backend:
  - The backend server is configured to allow requests from the frontend running at `http://localhost:3000`. If you need to adjust the CORS configuration or modify other server settings, you can do so in the `server.js` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
