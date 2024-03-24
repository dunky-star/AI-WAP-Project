const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookChefRoutes = require('./routes/cookChefRouter');
const userRoutes = require('./routes/userRouter');
const { connect } = require('./db/db');
const globalErrHandler = require('./other-errors/globalErrHandler');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

// Setting static folder for handling static resources.
app.use(express.static('public'));

// Middleware to parse incoming JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to handle CORS policy
app.use(cors());
// Sessions
app.use(
  session({
    secret: 'my cool app 2024',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Routes
app.use(userRoutes);
app.use(cookChefRoutes);

//Error handlers middleware
app.use(globalErrHandler);

//404 error
app.use('*', (req, res) => {
  console.log(req.originalUrl);
  res.status(404).json({
    message: `${req.originalUrl} - Route Not Found`,
  });
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
