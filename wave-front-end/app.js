const express = require('express');
const homeRoutes = require('./routes/home-route');
const loginRoutes = require('./routes/login-route');
const registerRoutes = require('./routes/register-route');
const app = express();
const cors = require('cors');
let session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', 'views');

// Use miidleware to create Express Sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files in public directory- css & JavaScript
app.use(express.static('public'));

// Custom routes
app.use(homeRoutes);
app.use(registerRoutes);
app.use(loginRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
