const express = require('express');
const path = require('path');
const loginRegisterRoutes = require('./routes/login-register-route');
const app = express();
const cors = require('cors');


const dotenv = require('dotenv');

const PORT = 4000;

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
