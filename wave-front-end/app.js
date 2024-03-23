const express = require('express');
const path = require('path');
const loginRegisterRoutes = require('./routes/login-register-route');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware
app.use(cors());

// Static files in public directory- css & JavaScript
app.use(express.static('public'));

// Custom routes
app.use(loginRegisterRoutes);

// Middleware to serve static files
//app.use('/css', express.static(path.join(__dirname, 'css')));
//app.use('/js', express.static(path.join(__dirname, 'js')));

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
