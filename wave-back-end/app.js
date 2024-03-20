const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookChefRoutes = require('./routes/cookChefRouter');
const userRoutes = require('./routes/userRouter');
const { connect } = require('./db/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Setting static folder for handling static resources.
app.use(express.static('public'));

// Middleware to parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to handle CORS policy
app.use(cors());

// Routes
app.use(userRoutes);
app.use(cookChefRoutes);

// Middleware for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Oops! The resource was not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Oops! An error occurred' });
});

async function startServer() {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server started and listening to requests on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
