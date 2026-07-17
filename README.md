# Paytm_v1

A full-stack payment application inspired by Paytm that allows users to sign up, log in, manage their account balance, search for other users, and securely transfer money using MongoDB transactions.

## Features

- User Authentication
  - Sign Up
  - Login using JWT Authentication
  - Protected Routes using Middleware

- Wallet System
  - Every new user receives a default wallet balance.
  - Users can check their available at a dashboard page.

- Search Users
  - Search users by their first or last name.
  - Fast and responsive user lookup.

- Money Transfer
  - Send money securely to another user.
  - Sender's balance is deducted instantly.
  - Receiver's balance is credited instantly.
  - Money transfers are performed using MongoDB Transactions to ensure data consistency.

- Transaction Safety
  - Prevents partial transactions.
  - If any operation fails, the entire transaction is rolled back.
  - Guarantees that money is never lost during transfers.

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- MongoDB Transactions (Sessions)

## Project Flow

```text
                Sign Up
                   |
                   |
                   v
             Create Account
                   |
                   |
                   v
          Assign Default Balance
                   |
                   |
                   v
                 Login
                   |
                   |
                   v
              JWT Token
                   |
                   |
                   v
            Dashboard Screen
                   |
                   |
                   v
              Check Balance
                   |
                   |
                   v
               Search User
                   |
                   |
                   v
              Enter Amount
                   |
                   |
                   v
               Send Money
                   |
                   |
                   v
         MongoDB Transaction Starts
                   |
                   |
                   v
          Deduct Amount From Sender
                   |
                   |
                   v
         Credit Amount To Receiver
                   |
                   |
                   v
            Commit Transaction
                   |
                   |
                   v
               Success
```

## MongoDB Transactions

Money transfers are handled using MongoDB Transactions.

Steps involved:

1. Start a MongoDB Session.
2. Verify sender's balance.
3. Deduct money from sender's account.
4. Credit money to receiver's account.
5. Commit the transaction.
6. If any step fails, abort the transaction.

This ensures:

- Atomicity
- Consistency
- Data Integrity
- Safe Money Transfers

## API Features

### Authentication

- User Signup
- User Login
- JWT Authentication

### User

- Get User Details
- Search Users
- Check Account Balance

### Account

- Transfer Money
- Balance Management
- Secure Transactions

## Security

- JWT Authentication
- Protected API Routes
- MongoDB Transactions
- Input Validation
- Middleware Authorization

## Future Improvements

- Transaction History
- Payment Requests
- Email Verification
- Profile Management
- Notifications
- QR Code Payments
- Pagination for User Search

## Installation

```bash
# Clone Repository
git clone < https://github.com/krish985/Paytm_v1.git >

# Install Frontend Dependencies
npm install

# Install Backend Dependencies
npm install

# Start Frontend
npm run dev

# Start Backend
node index.js
```

## Author

**Krish Kumar**

> A simple and secure payment application built to understand authentication, wallet systems, and MongoDB transactions.