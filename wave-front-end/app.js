const express = require('express');
const path = require('path');
const loginRegisterRoutes = require('./routes/login-register-route');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');



// url encoding
app.use(express.urlencoded({ extended: false }));

// body parser
app.use(express.json());

app.use(cookieParser());

const dotenv = require('dotenv');


const PORT = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', 'views');

// cors middleware
app.use(cors());

// Static files in public directory- css & JavaScript
app.use(express.static('public'));

// Custom routes
app.use(loginRegisterRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

dotenv.config();
