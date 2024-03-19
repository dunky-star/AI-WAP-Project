const express = require('express');
const app = express();
const cors = require('cors');
const cookChefRoutes = require('./routes/cookChefRoute');
const userRoutes = require('./routes/userRouter');

// Setting static folder for handling static resources.
app.use(express.static('public'));

// middleware to form contract for incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to handle CORS policy
app.use(cors());

// Routes import
app.use(userRoutes);
app.use(cookChefRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Oop! the resource not found' });
});

app.use((err, req, res, next) => {
  console.log(err.toString());
  res.status(500).json({ message: 'Oops! An error occurred' });
});

app.listen(3000, () =>
  console.log('Server started and listening to requests on port 3000')
);
