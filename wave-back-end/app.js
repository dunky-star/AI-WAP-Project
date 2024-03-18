const express = require('express');
const app = express();
const chatRoutes = require('./routes/chatroute');

// Setting static folder for handling static resources.
app.use(express.static('public'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes import
app.use(chatRoutes);

app.use((req, res, next) => {
  res.status(404).send('Oop! the resource not found');
});

app.use((err, req, res, next) => {
  console.log(err.toString());
  res.status(500).send('Oops! An error occurred');
});

app.listen(3000, () =>
  console.log('Server started and listening to requests on port 3000')
);
