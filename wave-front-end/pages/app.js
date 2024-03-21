const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});

//body parser
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
app.use(router);

// Middleware to serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
